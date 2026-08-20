// src/worker.ts
import { extractCaption, extractVideoMetadata } from './index';

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const videoId = url.searchParams.get('videoId');

    if (!videoId) {
      return new Response('Missing videoId parameter', { status: 400 });
    }

    try {
      // Extract captions
      const captions = await extractCaption(videoId);
      
      return new Response(JSON.stringify({
        success: true,
        data: captions
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error.message
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }
};
