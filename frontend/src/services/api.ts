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
      // Fallback to static JSON file (only for GitHub Pages, not production with backend)
      // In production with Docker, if API fails, don't fallback to static file
      const isProduction = process.env.NODE_ENV === 'production';
      
      if (!isProduction || process.env.REACT_APP_USE_STATIC_API) {
        try {
          const staticResponse = await fetch('/api/v1/chapters.json');
          if (staticResponse.ok) {
            const staticData = await staticResponse.json();
            return Array.isArray(staticData) ? staticData : (staticData.data || []);
          }
        } catch {
          // Ignore static file errors
        }
      }
      throw error;
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
      // Fallback to static JSON file (only for GitHub Pages, not production with backend)
      const isProduction = process.env.NODE_ENV === 'production';
      if (!isProduction || process.env.REACT_APP_USE_STATIC_API) {
        try {
          const staticResponse = await fetch('/api/v1/resources-pdfs.json');
          if (staticResponse.ok) {
            const staticData = await staticResponse.json();
            return Array.isArray(staticData) ? staticData : (staticData.data || []);
          }
        } catch {
          // Ignore static file errors
        }
      }
      throw error;
    }
  },
};

// Auth interfaces
export interface User {
  id: number;
  email: string;
  name?: string;
  created_at: string;
  updated_at: string;
  telegram_id?: number;
  language_id?: number;
  currency_id?: number;
  country_id?: number;
  is_active: boolean;
  email_verified_at?: string;
  referral_code: string;
  points: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Auth API
export const authApi = {
  register: async (data: RegisterRequest): Promise<{ message: string; user_id: number }> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  verifyEmail: async (data: VerifyEmailRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/verify-email', data);
    return response.data;
  },

  resendVerificationCode: async (email: string): Promise<{ message: string }> => {
    const response = await api.post('/auth/resend-code', { email });
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await api.get('/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  },
};

// Discussion API Types
export interface Thread {
  id: number;
  user_id: number;
  title: string;
  content: string;
  score: number;
  comment_count: number;
  view_count: number;
  is_pinned: boolean;
  is_locked: boolean;
  created_at: string;
  updated_at: string;
  edited_at?: string;
  author?: User;
  user_vote?: number;
  user_reactions?: string[];
}

export interface Comment {
  id: number;
  thread_id: number;
  user_id: number;
  parent_id?: number;
  content: string;
  score: number;
  depth: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  edited_at?: string;
  author?: User;
  user_vote?: number;
  user_reactions?: string[];
  replies?: Comment[];
}

export interface ThreadListResponse {
  threads: Thread[];
  total: number;
  page: number;
  per_page: number;
}

export interface ThreadDetailResponse {
  thread: Thread;
  comments: Comment[];
}

export interface CreateThreadRequest {
  title: string;
  content: string;
}

export interface UpdateThreadRequest {
  title: string;
  content: string;
}

export interface CreateCommentRequest {
  content: string;
  parent_id?: number;
}

export interface UpdateCommentRequest {
  content: string;
}

export interface VoteRequest {
  vote_type: 1 | -1;
}

export interface ReactionRequest {
  reaction_type: 'heart' | 'clap' | 'thumbs_up' | 'thumbs_down';
}

// Discussion API
export const discussionApi = {
  getThreads: async (params?: {
    sort?: 'newest' | 'oldest' | 'score' | 'comments';
    page?: number;
    per_page?: number;
  }): Promise<ThreadListResponse> => {
    const response = await api.get('/discussions', { params });
    return response.data;
  },

  getThread: async (id: number): Promise<ThreadDetailResponse> => {
    const response = await api.get(`/discussions/${id}`);
    return response.data;
  },

  createThread: async (data: CreateThreadRequest): Promise<Thread> => {
    const response = await api.post('/discussions', data);
    return response.data;
  },

  updateThread: async (id: number, data: UpdateThreadRequest): Promise<Thread> => {
    const response = await api.put(`/discussions/${id}`, data);
    return response.data;
  },

  createComment: async (threadId: number, data: CreateCommentRequest): Promise<Comment> => {
    const response = await api.post(`/discussions/${threadId}/comments`, data);
    return response.data;
  },

  updateComment: async (id: number, data: UpdateCommentRequest): Promise<Comment> => {
    const response = await api.put(`/discussions/comments/${id}`, data);
    return response.data;
  },

  voteThread: async (id: number, voteType: 1 | -1): Promise<void> => {
    await api.post(`/discussions/${id}/vote`, { vote_type: voteType });
  },

  voteComment: async (id: number, voteType: 1 | -1): Promise<void> => {
    await api.post(`/discussions/comments/${id}/vote`, { vote_type: voteType });
  },

  reactThread: async (id: number, reactionType: 'heart' | 'clap' | 'thumbs_up' | 'thumbs_down'): Promise<void> => {
    await api.post(`/discussions/${id}/react`, { reaction_type: reactionType });
  },

  reactComment: async (id: number, reactionType: 'heart' | 'clap' | 'thumbs_up' | 'thumbs_down'): Promise<void> => {
    await api.post(`/discussions/comments/${id}/react`, { reaction_type: reactionType });
  },
};

// Helper function to set auth token
export const setAuthToken = (token: string) => {
  localStorage.setItem('auth_token', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Helper function to remove auth token
export const removeAuthToken = () => {
  localStorage.removeItem('auth_token');
  delete api.defaults.headers.common['Authorization'];
};

// Initialize auth token if exists
const token = localStorage.getItem('auth_token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;

