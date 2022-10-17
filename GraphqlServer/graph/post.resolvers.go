package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"time"

	"github.com/BudimanOey/tpa-web-server/graph/generated"
	"github.com/BudimanOey/tpa-web-server/graph/model"
	"github.com/google/uuid"
	"github.com/samber/lo"
)

// CreatePost is the resolver for the createPost field.
func (r *mutationResolver) CreatePost(ctx context.Context, input *model.NewPost) (string, error) {
	post := &model.Post{
		ID:        uuid.NewString(),
		Text:      input.Text,
		PhotoURL:  input.PhotoURL,
		VideoURL:  input.VideoURL,
		LikedBy:   []string{},
		Creator:   input.Creator,
		CreatedAt: time.Now(),
	}
	err := r.DB.Model(post).Create(post).Error
	return "Success create post", err
}

// LikePost is the resolver for the likePost field.
func (r *mutationResolver) LikePost(ctx context.Context, postID string, likedByID string) (string, error) {
	post := new(model.Post)
	if err := r.DB.First(post, "ID = ?", postID).Error; err != nil {
		return "Post not found", err
	}
	post.LikedBy = append(post.LikedBy, likedByID)

	if likedByID != post.Creator {
		_, err := r.AddNotification(ctx, likedByID, post.Creator, "Has liked your post!")
		if err != nil {
			return "Error while adding notif", err
		}
	}

	return "Success like post", r.DB.Save(post).Error
}

// LikedBy is the resolver for the likedBy field.
func (r *postResolver) LikedBy(ctx context.Context, obj *model.Post) ([]string, error) {
	return obj.LikedBy, nil
}

// GetPosts is the resolver for the getPosts field.
func (r *queryResolver) GetPosts(ctx context.Context, id string, limit int, offset int) ([]*model.Post, error) {
	var posts []*model.Post
	modelUser := new(model.User)

	if err := r.DB.Find(modelUser, "id = ?", id).Error; err != nil {
		return nil, err
	}

	arr := []string{}
	arr = append(arr, id)
	for _, v := range modelUser.FollowedUser {
		arr = append(arr, v)
	}
	for _, val := range modelUser.ConnectedUser {
		arr = append(arr, val)
	}
	arr = lo.Uniq(arr)

	err := r.DB.Model(posts).Limit(limit).Offset(offset).Order("created_at desc").Find(&posts, "creator IN (?)", arr).Error
	return posts, err
}

// GetPostByID is the resolver for the getPostByID field.
func (r *queryResolver) GetPostByID(ctx context.Context, id *string) (*model.Post, error) {
	var post *model.Post
	err := r.DB.Model(post).Where("ID LIKE ?", id).Take(&post).Error
	if err != nil {
		return nil, err
	}
	return post, nil
}

// Post returns generated.PostResolver implementation.
func (r *Resolver) Post() generated.PostResolver { return &postResolver{r} }

type postResolver struct{ *Resolver }
