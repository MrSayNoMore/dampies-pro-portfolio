CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  location TEXT,
  service TEXT NOT NULL,
  project_description TEXT,
  start_timeframe TEXT,
  uploaded_images TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New','Contacted','Quoted','Won','Closed'))
);

GRANT INSERT ON public.quote_requests TO anon;
GRANT INSERT ON public.quote_requests TO authenticated;
GRANT ALL ON public.quote_requests TO service_role;

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a quote request"
  ON public.quote_requests FOR INSERT TO anon, authenticated
  WITH CHECK (true);