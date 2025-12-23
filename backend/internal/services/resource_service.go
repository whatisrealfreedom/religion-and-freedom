package services

import (
	"github.com/whatisrealfreedom/freedom-website/internal/models"
	"github.com/whatisrealfreedom/freedom-website/internal/repository"
)

type ResourceService interface {
	GetAllResources() ([]models.Resource, error)
	GetPDFResources() ([]models.PDFResource, error)
	GetResourceByID(id int) (*models.Resource, error)
}

type resourceService struct {
	repo repository.ResourceRepository
}

func NewResourceService(repo repository.ResourceRepository) ResourceService {
	return &resourceService{repo: repo}
}

func (s *resourceService) GetAllResources() ([]models.Resource, error) {
	return s.repo.GetAll()
}

func (s *resourceService) GetPDFResources() ([]models.PDFResource, error) {
	return s.repo.GetPDFs()
}

func (s *resourceService) GetResourceByID(id int) (*models.Resource, error) {
	return s.repo.GetByID(id)
}
