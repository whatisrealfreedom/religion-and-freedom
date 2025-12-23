import axios from 'axios';
import { chapterApi, resourceApi } from '../api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Services', () => {
  beforeEach(() => {
    mockedAxios.create.mockReturnValue(mockedAxios as any);
  });

  describe('chapterApi', () => {
    it('getAll should fetch all chapters', async () => {
      const mockData = {
        data: {
          data: [
            { id: 1, title: 'Chapter 1', number: 1 },
            { id: 2, title: 'Chapter 2', number: 2 },
          ],
        },
      };

      mockedAxios.get.mockResolvedValue(mockData);

      const chapters = await chapterApi.getAll();

      expect(chapters).toHaveLength(2);
      expect(chapters[0].title).toBe('Chapter 1');
      expect(mockedAxios.get).toHaveBeenCalledWith('/chapters');
    });

    it('getById should fetch a specific chapter', async () => {
      const mockData = {
        data: {
          data: { id: 1, title: 'Chapter 1', number: 1 },
        },
      };

      mockedAxios.get.mockResolvedValue(mockData);

      const chapter = await chapterApi.getById(1);

      expect(chapter.title).toBe('Chapter 1');
      expect(mockedAxios.get).toHaveBeenCalledWith('/chapters/1');
    });
  });

  describe('resourceApi', () => {
    it('getPDFs should fetch all PDFs', async () => {
      const mockData = {
        data: {
          data: [
            { id: 1, title: 'PDF 1', number: 1 },
          ],
        },
      };

      mockedAxios.get.mockResolvedValue(mockData);

      const pdfs = await resourceApi.getPDFs();

      expect(pdfs).toHaveLength(1);
      expect(mockedAxios.get).toHaveBeenCalledWith('/resources/pdfs');
    });
  });
});

