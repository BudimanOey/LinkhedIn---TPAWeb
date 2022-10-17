package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/BudimanOey/tpa-web-server/graph/model"
	"github.com/google/uuid"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

// AddHashtag is the resolver for the addHashtag field.
func (r *mutationResolver) AddHashtag(ctx context.Context, hashtag string) (*model.Hashtag, error) {
	modelHtag := new(model.Hashtag)
	htag := &model.Hashtag{
		ID:      uuid.NewString(),
		Hashtag: hashtag,
	}

	if err := r.DB.Find(modelHtag, "hashtag = ?", hashtag).Error; err != nil {
		return nil, err
	}

	if modelHtag.ID != "" {
		return nil, gqlerror.Errorf("hashtag already exist")
	}

	err := r.DB.Model(htag).Create(htag).Error
	return htag, err
}

// GetHashtags is the resolver for the getHashtags field.
func (r *queryResolver) GetHashtags(ctx context.Context) ([]*model.Hashtag, error) {
	var htags []*model.Hashtag
	err := r.DB.Model(htags).Find(&htags).Error
	return htags, err
}
