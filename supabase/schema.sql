-- Run this in the Supabase SQL Editor. Configure Clerk as a third-party auth provider in Supabase.
-- Legacy reference only. Do not run: the active schema is managed by Prisma in backend/prisma/.
create table if not exists public.bikes (
  id text primary key,
  name text not null,
  type text not null,
  station text not null,
  price integer not null check (price >= 0),
  image text,
  available boolean not null default true
);

create table if not exists public.rentals (
  id bigint generated always as identity primary key,
  bike_id text not null references public.bikes(id),
  user_id text not null,
  started_at timestamptz not null default now(),
  returned_at timestamptz
);

create index if not exists rentals_user_started_idx
  on public.rentals (user_id, started_at desc);

alter table public.bikes enable row level security;
alter table public.rentals enable row level security;

drop policy if exists "Signed-in users can view bikes" on public.bikes;
create policy "Signed-in users can view bikes" on public.bikes
  for select to authenticated using (true);
drop policy if exists "Users can view their rentals" on public.rentals;
create policy "Users can view their rentals" on public.rentals
  for select to authenticated using (user_id = (auth.jwt() ->> 'sub'));

create or replace function public.start_bike_rental(requested_bike_id text)
returns public.rentals language plpgsql security definer set search_path = '' as $$
declare
  new_rental public.rentals;
  current_user_id text := auth.jwt() ->> 'sub';
begin
  if current_user_id is null then raise exception 'Sign in to rent a bike'; end if;
  update public.bikes set available = false
    where id = requested_bike_id and available = true;
  if not found then raise exception 'This bike is no longer available'; end if;
  insert into public.rentals (bike_id, user_id)
    values (requested_bike_id, current_user_id) returning * into new_rental;
  return new_rental;
end;
$$;

create or replace function public.return_bike_rental(requested_rental_id bigint)
returns public.rentals language plpgsql security definer set search_path = '' as $$
declare
  ended_rental public.rentals;
  current_user_id text := auth.jwt() ->> 'sub';
begin
  update public.rentals set returned_at = now()
    where id = requested_rental_id and user_id = current_user_id
      and returned_at is null returning * into ended_rental;
  if not found then raise exception 'Active rental not found'; end if;
  update public.bikes set available = true where id = ended_rental.bike_id;
  return ended_rental;
end;
$$;

grant select on public.bikes, public.rentals to authenticated;
grant usage, select on sequence public.rentals_id_seq to authenticated;
grant execute on function public.start_bike_rental(text) to authenticated;
grant execute on function public.return_bike_rental(bigint) to authenticated;

insert into public.bikes (id, name, type, station, price, image, available) values
  ('BD-001', 'Bike #BD-001', 'City Bike', 'JKUAT Main Gate', 50, '/images/BD-001.jpg', true),
  ('BD-002', 'Bike #BD-002', 'Mountain Bike', 'Gate B Station', 70, '/images/BD-002.jpg', true),
  ('BD-003', 'Bike #BD-003', 'City Bike', 'Juja Mall', 50, '/images/BD-003.jpg', false)
on conflict (id) do nothing;


