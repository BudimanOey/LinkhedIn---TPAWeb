package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/BudimanOey/tpa-web-server/graph/model"
)

// Search is the resolver for the Search field.
func (r *queryResolver) Search(ctx context.Context, keyword string, limit int, offset int) (*model.Search, error) {
	// var search *model.Search
	panic(fmt.Errorf("not implemented"))
}

// SearchConnectedUser is the resolver for the SearchConnectedUser field.
func (r *queryResolver) SearchConnectedUser(ctx context.Context, keyword string, userID string) ([]*model.User, error) {
	var modelUsers []*model.User
	var userConnections []string
	user,_ := r.GetUserByID(ctx, userID)
	for i := 0; i < len(user.ConnectedUser); i++ {
		userConnections = append(userConnections, user.ConnectedUser[i])
	}
	if err := r.DB.Not("id = ?", userID).Find(&modelUsers, "lower(concat(first_name, last_name)) like lower(?) and id in(?)", "%"+keyword+"%", userConnections).Error; err != nil {
		return nil, err
	}
	return modelUsers, nil
}

// SearchUser is the resolver for the SearchUser field.
func (r *queryResolver) SearchUser(ctx context.Context, keyword string, limit int, offset int, currUserID string) ([]*model.User, error) {
	var modelUsers []*model.User

	if err := r.DB.Limit(limit).Offset(offset).Not("id = ?", currUserID).Find(&modelUsers, "lower(concat(first_name, last_name)) like lower(?)", "%"+keyword+"%").Error; err != nil {
		return nil, err
	}
	return modelUsers, nil
}

// SearchPost is the resolver for the SearchPost field.
func (r *queryResolver) SearchPost(ctx context.Context, keyword string, limit int, offset int) ([]*model.Post, error) {
	var modelPosts []*model.Post

	if err := r.DB.Limit(limit).Offset(offset).Find(&modelPosts, "lower(text) like lower(?)", "%"+keyword+"%").Error; err != nil {
		return nil, err
	}

	return modelPosts, nil
}

// SearchHashtag is the resolver for the SearchHashtag field.
func (r *queryResolver) SearchHashtag(ctx context.Context, keyword string, limit int, offset int) ([]*model.Post, error) {
	var modelPosts []*model.Post

	if err := r.DB.Limit(limit).Offset(offset).Find(&modelPosts, "text like ?", "%#"+keyword+"%").Error; err != nil {
		return nil, err
	}

	return modelPosts, nil
}
