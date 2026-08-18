insert into storage.buckets (id, name, public)
values ('bmo-assets', 'bmo-assets', false)
on conflict (id) do nothing;

comment on table storage.buckets is 'مخزن أصول خاص بمنصة BMO، لا يُعرض للعامة افتراضياً.';
