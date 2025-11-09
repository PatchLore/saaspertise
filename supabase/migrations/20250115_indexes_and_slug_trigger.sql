create unique index if not exists companies_website_key on companies (website);

create index if not exists companies_slug_idx on companies (slug);

-- trigger to auto-create slug from name
create or replace function make_slug() returns trigger as $$
begin
  if new.slug is null or new.slug = '' then
    new.slug := regexp_replace(lower(new.name), '[^a-z0-9]+', '-', 'g');
    new.slug := trim(both '-' from new.slug);
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists companies_slug_trg on companies;
create trigger companies_slug_trg
before insert or update on companies
for each row execute function make_slug();
