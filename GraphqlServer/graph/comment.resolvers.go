package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"time"

	"github.com/BudimanOey/tpa-web-server/graph/generated"
	"github.com/BudimanOey/tpa-web-server/graph/model"
	"github.com/google/uuid"
)

// LikedBy is the resolver for the likedBy field.
func (r *commentResolver) LikedBy(ctx context.Context, obj *model.Comment) ([]string, error) {
	return obj.LikedBy, nil
}

// AddComment is the resolver for the addComment field.
func (r *mutationResolver) AddComment(ctx context.Context, input *model.NewComment) (string, error) {
	comment := &model.Comment{
		ID:             uuid.NewString(),
		Content:        input.Content,
		CommentOfPost:  input.CommentOfPost,
		ReplyOfComment: input.ReplyOfComment,
		LikedBy:        []string{},
		CreatedAt:      time.Now(),
		CommentedBy:    input.CommentedBy,
	}
	if err := r.DB.Model(comment).Create(comment).Error; err != nil {
		return "Fail create comment", err
	}

	if comment.CommentOfPost != "" {

		post, err := r.Query().GetPostByID(ctx, &comment.CommentOfPost)
		if err != nil {
			return "Error while getting post", err
		}

		if post.Creator != comment.CommentedBy {
			_, err2 := r.AddNotification(ctx, comment.CommentedBy, post.Creator, "Has commented your post!")

			if err2 != nil {
				return "Error while sending notif", err
			}
		}
	}

	return "Success create", nil
}

// LikeComment is the resolver for the likeComment field.
func (r *mutationResolver) LikeComment(ctx context.Context, commentID string, likedByID string) (string, error) {
	comment := new(model.Comment)
	if err := r.DB.First(comment, "ID = ?", commentID).Error; err != nil {
		return "Error while getting comment", err
	}
	comment.LikedBy = append(comment.LikedBy, likedByID)
	return "Success like comment", r.DB.Save(comment).Error
}

// GetCommentFromPost is the resolver for the getCommentFromPost field.
func (r *queryResolver) GetCommentFromPost(ctx context.Context, postID string, limit int, offset int) ([]*model.Comment, error) {
	var comments []*model.Comment
	if err := r.DB.Model(comments).Limit(limit).Offset(offset).Order("created_at").Find(&comments, "comment_of_post = ?", postID).Error; err != nil {
		return nil, err
	}

	return comments, nil
}

// GetCommentReplies is the resolver for the getCommentReplies field.
func (r *queryResolver) GetCommentReplies(ctx context.Context, commentID string, limit int, offset int) ([]*model.Comment, error) {
	var comments []*model.Comment
	if err := r.DB.Model(comments).Limit(limit).Offset(offset).Order("created_at").Find(&comments, "reply_of_comment = ?", commentID).Error; err != nil {
		return nil, err
	}
	return comments, nil
}

// Comment returns generated.CommentResolver implementation.
func (r *Resolver) Comment() generated.CommentResolver { return &commentResolver{r} }

type commentResolver struct{ *Resolver }
