package repository

// Repository holds all repositories
type Repository struct {
	Chapter  ChapterRepository
	Resource ResourceRepository
	User     UserRepository
}

func NewRepository(db Database) *Repository {
	return &Repository{
		Chapter:  NewChapterRepository(db.GetDB()),
		Resource: NewResourceRepository(db.GetDB()),
		User:     NewUserRepository(db.GetDB()),
	}
}
