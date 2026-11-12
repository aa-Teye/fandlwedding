-- RSVP replies from the wedding site.
create table if not exists rsvps (
  id          serial primary key,
  name        text not null,
  attending   boolean not null,
  guests      integer not null default 1 check (guests between 0 and 10),
  message     text not null default '',
  invited_as  text not null default '',
  created_at  timestamptz not null default now()
);
create index if not exists rsvps_created_at_idx on rsvps (created_at desc);
