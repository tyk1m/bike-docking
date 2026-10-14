-- Add or refresh the starter fleet in an existing Supabase project.
-- Run in Supabase Dashboard → SQL Editor → New query.
-- Legacy reference only. Use `npm --prefix backend run db:seed` for the active Prisma setup.
insert into public.bikes (id, name, type, station, price, image, available) values
  ('BD-001', 'Bike #BD-001', 'City Bike', 'JKUAT Main Gate', 50, '/images/BD-001.jpg', true),
  ('BD-002', 'Bike #BD-002', 'Mountain Bike', 'Gate B Station', 70, '/images/BD-002.jpg', true),
  ('BD-003', 'Bike #BD-003', 'City Bike', 'Juja Mall', 50, '/images/BD-003.jpg', false)
on conflict (id) do update set
  name = excluded.name,
  type = excluded.type,
  station = excluded.station,
  price = excluded.price,
  image = excluded.image;
