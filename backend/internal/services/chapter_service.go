package services

import (
	"github.com/whatisrealfreedom/freedom-website/internal/models"
	"github.com/whatisrealfreedom/freedom-website/internal/repository"
)

type ChapterService interface {
	GetAllChapters() ([]models.ChapterSummary, error)
	GetChapterByID(id int) (*models.Chapter, error)
	GetChapterBySlug(slug string) (*models.Chapter, error)
}

type chapterService struct {
	repo repository.ChapterRepository
}

func NewChapterService(repo repository.ChapterRepository) ChapterService {
	return &chapterService{repo: repo}
}

func (s *chapterService) GetAllChapters() ([]models.ChapterSummary, error) {
	return s.repo.GetAll()
}

func (s *chapterService) GetChapterByID(id int) (*models.Chapter, error) {
	return s.repo.GetByID(id)
}

func (s *chapterService) GetChapterBySlug(slug string) (*models.Chapter, error) {
	return s.repo.GetBySlug(slug)
}
