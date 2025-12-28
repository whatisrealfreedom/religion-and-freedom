package repository

// Repository holds all repositories
type Repository struct {
	Chapter   ChapterRepository
	Resource  ResourceRepository
	User      UserRepository
	Thread    ThreadRepository
	Comment   CommentRepository
	Vote      VoteRepository
	Reaction  ReactionRepository
}

func NewRepository(db Database) *Repository {
	return &Repository{
		Chapter:   NewChapterRepository(db.GetDB()),
		Resource:  NewResourceRepository(db.GetDB()),
		User:      NewUserRepository(db.GetDB()),
		Thread:    NewThreadRepository(db.GetDB()),
		Comment:   NewCommentRepository(db.GetDB()),
		Vote:      NewVoteRepository(db.GetDB()),
		Reaction:  NewReactionRepository(db.GetDB()),
	}
}
