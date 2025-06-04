
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-blog-titles.ts';
import '@/ai/flows/portfolio-chat-flow.ts'; // Added import for the new chat flow
import '@/ai/flows/generate-blog-content-flow.ts'; // Added import for blog content generation
