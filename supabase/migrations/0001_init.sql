-- Messages du formulaire de contact.
-- L'inscription Supabase étant ouverte par défaut, aucun rôle API ne lit la
-- table : les messages se consultent dans le tableau de bord Supabase.

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 200),
  message text not null check (char_length(message) between 1 and 5000),
  read boolean not null default false
);

alter table public.messages enable row level security;

-- Un visiteur peut écrire un message, jamais en lire.
create policy "visiteurs : envoi de message"
  on public.messages for insert
  to anon, authenticated
  with check (read = false);

create policy "propriétaire : lecture"
  on public.messages for select
  to authenticated
  using (false);

create policy "propriétaire : mise à jour"
  on public.messages for update
  to authenticated
  using (false)
  with check (false);
