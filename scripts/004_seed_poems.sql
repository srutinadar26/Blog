-- Seed: Add sample poems by Sruti
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- First, add an 'author' column if it doesn't exist
ALTER TABLE poems ADD COLUMN IF NOT EXISTS author TEXT DEFAULT 'Sruti';

INSERT INTO poems (title, content, preview, excerpt, author, created_at) VALUES
(
  'The Quiet Between Stars',
  $$Between the stars there is a quiet
that the world has forgotten how to hold,
no rushing wind, no ticking clock,
just space — unhurried, old.

I wonder if the sky gets lonely too,
stretched so wide it cannot fold,
carrying constellations on its back
with stories left untold.

Maybe silence is not emptiness at all,
but a room where truths are sewn,
where every unspoken word finds rest —
a language of its own.$$,
  'A meditation on silence, space, and the truths we carry without words',
  'A meditation on silence, space, and the truths we carry without words',
  'Sruti',
  NOW()
),
(
  'Letters I Never Sent',
  $$I wrote you letters in the margins of my days,
between grocery lists and half-finished prayers,
words that curled like smoke before they reached the page,
heavy with all the things I didn't dare to say.

Some were apologies wrapped in metaphors,
some were confessions dressed as poetry,
and one — just one — was simply this:
I miss the version of us that used to be easy.

They live now in a drawer I never open,
folded into silence, soft and frayed,
proof that some feelings are too honest for the world —
so they stay, tenderly, unmailed.$$,
  'Unspoken words and the tender weight of feelings we keep to ourselves',
  'Unspoken words and the tender weight of feelings we keep to ourselves',
  'Sruti',
  NOW() - INTERVAL '2 days'
),
(
  'Small Joys',
  $$The first sip of chai on a cold morning,
sunlight catching dust like tiny dancers,
a dog that wags its tail at strangers —
these are the answers.

Not to the big questions,
not to the ache that hums at 2 a.m.,
but to the smaller one that whispers:
is today worth showing up again?

Yes. Always yes.
In every small and ordinary thing,
there is a universe insisting
that life is still worth opening.$$,
  'Finding meaning in the everyday moments that quietly remind us to keep going',
  'Finding meaning in the everyday moments that quietly remind us to keep going',
  'Sruti',
  NOW() - INTERVAL '5 days'
);
