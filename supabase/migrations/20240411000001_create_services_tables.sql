
-- Create service categories table
CREATE TABLE public.service_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create service offers table
CREATE TABLE public.service_offers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES public.service_categories(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  thumbnail_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  rating DECIMAL(3, 2),
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create service requests table
CREATE TABLE public.service_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES public.service_categories(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  budget DECIMAL(10, 2),
  location TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- Policies for service_categories
CREATE POLICY "Service categories are viewable by everyone"
  ON public.service_categories
  FOR SELECT
  USING (true);

-- Policies for service_offers
CREATE POLICY "Service offers are viewable by everyone"
  ON public.service_offers
  FOR SELECT
  USING (true);

CREATE POLICY "Providers can create their own service offers"
  ON public.service_offers
  FOR INSERT
  WITH CHECK (auth.uid() = provider_id);

CREATE POLICY "Providers can update their own service offers"
  ON public.service_offers
  FOR UPDATE
  USING (auth.uid() = provider_id);

CREATE POLICY "Providers can delete their own service offers"
  ON public.service_offers
  FOR DELETE
  USING (auth.uid() = provider_id);

-- Policies for service_requests
CREATE POLICY "Service requests are viewable by everyone"
  ON public.service_requests
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own service requests"
  ON public.service_requests
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own service requests"
  ON public.service_requests
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own service requests"
  ON public.service_requests
  FOR DELETE
  USING (auth.uid() = user_id);

-- Insert some initial service categories
INSERT INTO public.service_categories (name, description, icon_url)
VALUES 
  ('Cleaning', 'Home and office cleaning services', null),
  ('Repairs', 'Home repairs and maintenance', null),
  ('Education', 'Tutoring and educational services', null),
  ('IT & Programming', 'IT support and programming services', null),
  ('Design', 'Graphic and UI/UX design services', null),
  ('Health & Beauty', 'Personal care and beauty services', null),
  ('Transportation', 'Transportation and delivery services', null),
  ('Events', 'Event planning and management', null);
