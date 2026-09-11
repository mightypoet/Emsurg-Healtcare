/*
Supabase SQL Schema Requirements:

-- Create posts table
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  category TEXT,
  author TEXT DEFAULT 'Emsurg Medical Team',
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published posts
CREATE POLICY "Public can view published posts" ON posts
  FOR SELECT USING (published = true);

-- Allow authenticated users (admins) full access
CREATE POLICY "Admins have full access to posts" ON posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Create blog-assets bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-assets', 'blog-assets', true);

-- Allow public read access to blog-assets
CREATE POLICY "Public can view blog-assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-assets');

-- Allow authenticated users full access to blog-assets
CREATE POLICY "Admins have full access to blog-assets" ON storage.objects
  FOR ALL USING (bucket_id = 'blog-assets' AND auth.role() = 'authenticated');
*/

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ulglftaptfvkatzhpmwc.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_RKnKo4eegUWKp-eqKaBWnQ_EPmimPWm';

export const supabase = createClient(supabaseUrl, supabaseKey);
