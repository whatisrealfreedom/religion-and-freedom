import axios from 'axios';

// In production (Docker), use relative path via nginx proxy
// In development, use absolute URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' ? '/api/v1' : 'http://localhost:8060/api/v1');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ChapterSummary {
  id: number;
  number: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  pages: number;
  read_time: number;
  featured: boolean;
}

export interface Chapter {
  id: number;
  number: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  icon: string;
  pages: number;
  read_time: number;
  featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface PDFResource {
  id: number;
  number: number;
  title: string;
  description: string;
  file_url: string;
  file_size: number;
  pages: number;
  icon: string;
  summary?: string;
}

export const chapterApi = {
  getAll: async (): Promise<ChapterSummary[]> => {
    try {
      const response = await api.get('/chapters');
      // Handle both API response format and static JSON format
      if (response.data.data) {
        return response.data.data;
      }
      // Static JSON format (for GitHub Pages)
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      // Fallback to static JSON file
      try {
        const staticResponse = await fetch('/api/v1/chapters.json');
        const staticData = await staticResponse.json();
        return Array.isArray(staticData) ? staticData : (staticData.data || []);
      } catch {
        throw error;
      }
    }
  },
  getById: async (id: number, locale: string = 'fa'): Promise<Chapter> => {
    try {
      const response = await api.get(`/chapters/${id}?locale=${locale}`);
      return response.data.data;
    } catch (error) {
      // For static JSON, we need to fetch all and filter
      const allChapters = await chapterApi.getAll();
      const chapter = allChapters.find(c => c.id === id);
      if (!chapter) {
        throw new Error('Chapter not found');
      }
      // For static files, we might need to fetch full content separately
      // This is a simplified version
      return chapter as Chapter;
    }
  },
};

export const resourceApi = {
  getPDFs: async (): Promise<PDFResource[]> => {
    try {
      const response = await api.get('/resources/pdfs');
      // Handle both API response format and static JSON format
      if (response.data.data) {
        return response.data.data;
      }
      // Static JSON format
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      // Fallback to static JSON file
      try {
        const staticResponse = await fetch('/api/v1/resources-pdfs.json');
        const staticData = await staticResponse.json();
        return Array.isArray(staticData) ? staticData : (staticData.data || []);
      } catch {
        throw error;
      }
    }
  },
};

export default api;

