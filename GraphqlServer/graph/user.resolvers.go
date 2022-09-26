package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/BudimanOey/tpa-web-server/graph/generated"
	"github.com/BudimanOey/tpa-web-server/graph/model"
	"github.com/BudimanOey/tpa-web-server/helper"
	"github.com/BudimanOey/tpa-web-server/service"
	"github.com/google/uuid"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

// RegisterUser is the resolver for the registerUser field.
func (r *mutationResolver) RegisterUser(ctx context.Context, input model.NewUser, backgroundPicture string) (interface{}, error) {
	_, err := r.Query().GetUserByEmail(ctx, input.Email)

	if err == nil {
		return nil, err
	}

	user := &model.User{
		ID:                uuid.NewString(),
		FirstName:         input.FirstName,
		LastName:          input.LastName,
		Email:             input.Email,
		Password:          helper.HashPassword(input.Password),
		Activated:         false,
		ProfilePicture:    input.ProfilePicture,
		BackgroundPicture: backgroundPicture,
		ConnectRequest:    []string{},
		RequestConnectTo:  []string{},
		ConnectedUser:     []string{},
		FollowedUser:      []string{},
		BlockedUser:       []string{},
	}

	if err := r.DB.Model(user).Create(user).Error; err != nil {
		return user, err
	}

	invitation, err := r.Mutation().GenerateActivation(ctx, user.ID)

	service.SendEmail(user.Email, "LinkhedIn account activation", "Here's your activation accoount link : http://127.0.0.1:5173/"+invitation)

	return map[string]interface{}{}, nil
}

// LoginUser is the resolver for the loginUser field.
func (r *mutationResolver) LoginUser(ctx context.Context, email string, password string) (interface{}, error) {
	user, errGetUser := r.Query().GetUserByEmail(ctx, email)
	if errGetUser != nil {
		if errGetUser == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "Email not found!",
			}
		}
		return nil, errGetUser
	}

	if err := helper.ComparePassword(user.Password, password); err != nil {
		return nil, err
	}

	token, errGenerate := service.JwtGenerate(ctx, user.ID)

	if errGenerate != nil {
		return nil, errGenerate
	}

	return map[string]interface{}{
		"id":                user.ID,
		"token":             token,
		"firstName":         user.FirstName,
		"lastName":          user.LastName,
		"email":             user.Email,
		"profilePicture":    user.ProfilePicture,
		"backgroundPicture": user.BackgroundPicture,
		"activated":         user.Activated,
		"connectRequest":    user.ConnectRequest,
		"requestConnectTo":  user.RequestConnectTo,
		"connectedUser":     user.ConnectedUser,
		"followedUser":      user.FollowedUser,
		"blockedUser":       user.BlockedUser,
	}, nil
}

// LoginUserByGmail is the resolver for the loginUserByGmail field.
func (r *mutationResolver) LoginUserByGmail(ctx context.Context, email string) (interface{}, error) {
	user, errGetUser := r.Query().GetUserByEmail(ctx, email)
	if errGetUser != nil {
		if errGetUser == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "Email not found!",
			}
		}
		return nil, errGetUser
	}

	token, errGenerate := service.JwtGenerate(ctx, user.ID)

	if errGenerate != nil {
		return nil, errGenerate
	}

	return map[string]interface{}{
		"id":                user.ID,
		"token":             token,
		"firstName":         user.FirstName,
		"lastName":          user.LastName,
		"email":             user.Email,
		"profilePicture":    user.ProfilePicture,
		"backgroundPicture": user.BackgroundPicture,
		"activated":         user.Activated,
		"connectRequest":    user.ConnectRequest,
		"requestConnectTo":  user.RequestConnectTo,
		"connectedUser":     user.ConnectedUser,
		"followedUser":      user.FollowedUser,
		"blockedUser":       user.BlockedUser,
	}, nil
}

// ActivateUser is the resolver for the activateUser field.
func (r *mutationResolver) ActivateUser(ctx context.Context, id string) (interface{}, error) {
	var user *model.User
	if err := r.DB.Model(user).Where("ID = ?", id).Update("Activated", true).Error; err != nil {
		return nil, err
	}
	return user, nil
}

// UpdateProfileImage is the resolver for the updateProfileImage field.
func (r *mutationResolver) UpdateProfileImage(ctx context.Context, id string, imgURL string) (string, error) {
	var user *model.User
	err := r.DB.Model(user).Where("ID = ?", id).Update("profile_picture", imgURL).Error
	return imgURL, err
}

// UpdateBackgroundPicture is the resolver for the updateBackgroundPicture field.
func (r *mutationResolver) UpdateBackgroundPicture(ctx context.Context, id string, imgURL string) (string, error) {
	var user *model.User
	err := r.DB.Model(user).Where("ID = ?", id).Update("background_picture", imgURL).Error
	return imgURL, err
}

// UpdateUsername is the resolver for the updateUsername field.
func (r *mutationResolver) UpdateUsername(ctx context.Context, id string, newUsername *string) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

// UpdateUserPassword is the resolver for the updateUserPassword field.
func (r *mutationResolver) UpdateUserPassword(ctx context.Context, id string, newPass string) (string, error) {
	var user *model.User
	hashedPass := helper.HashPassword(newPass)
	err := r.DB.Model(user).Where("ID = ?", id).Update("password", hashedPass).Error
	return "Succedd update", err
}

// ConnectionRequest is the resolver for the connectionRequest field.
func (r *mutationResolver) ConnectionRequest(ctx context.Context, userID string, recepient string) (string, error) {
	user := new(model.User)
	if err := r.DB.First(user, "ID = ?", recepient).Error; err != nil {
		return "user not found!", err
	}

	user.ConnectRequest = append(user.ConnectRequest, userID)
	_, err := r.RequestConnectTo(ctx, userID, recepient)

	if err != nil {
		return "error", nil
	}

	return "Connection request has been sent!", r.DB.Save(user).Error
}

// RequestConnectTo is the resolver for the requestConnectTo field.
func (r *mutationResolver) RequestConnectTo(ctx context.Context, userID string, recepient string) (string, error) {
	user := new(model.User)
	if err := r.DB.First(user, "ID = ?", userID).Error; err != nil {
		return "Error while getting user", err
	}

	user.RequestConnectTo = append(user.RequestConnectTo, recepient)

	return "Success", r.DB.Save(user).Error
}

// AcceptConnection is the resolver for the acceptConnection field.
func (r *mutationResolver) AcceptConnection(ctx context.Context, userID string, sender string) (string, error) {
	recepientModel := new(model.User)
	senderModel := new(model.User)
	if err := r.DB.First(recepientModel, "ID = ?", userID).Error; err != nil {
		return "error while getting user", err
	}
	if err := r.DB.First(senderModel, "ID = ?", sender).Error; err != nil {
		return "error while getting user", err
	}
	arrLen := (len(recepientModel.ConnectRequest) - 1)
	arrReq := make([]string, arrLen)
	k := 0
	for i := 0; i < arrLen; {
		if recepientModel.ConnectRequest[i] != userID {
			arrReq[i] = recepientModel.ConnectRequest[k]
			k++
			i++
		} else {
			k++
		}
	}
	senderModel.ConnectedUser = append(senderModel.ConnectedUser, userID)
	recepientModel.ConnectedUser = append(recepientModel.ConnectedUser, sender)

	if err := r.DB.Save(recepientModel).Error; err != nil {
		return "error while saving model", err
	}
	if err := r.DB.Save(senderModel).Error; err != nil {
		return "error while saving model", err
	}

	_, err := r.RemoveConnectRequest(ctx, userID, sender)

	_, err2 := r.RemoveRequestConnectTo(ctx, sender, userID)

	if err != nil {
		return "Error while remove req connect !", err
	}

	if err2 != nil {
		return "error", nil
	}

	return "Success", nil
}

// DeclineConnection is the resolver for the declineConnection field.
func (r *mutationResolver) DeclineConnection(ctx context.Context, userID string, sender string) (string, error) {
	_, err := r.RemoveConnectRequest(ctx, userID, sender)

	_, err2 := r.RemoveRequestConnectTo(ctx, sender, userID)

	if err != nil {
		return "Error while remove req connect !", err
	}

	if err2 != nil {
		return "Error", nil
	}
	return "Success", nil
}

// RemoveConnectRequest is the resolver for the removeConnectRequest field.
func (r *mutationResolver) RemoveConnectRequest(ctx context.Context, userID string, sender string) (string, error) {
	user := new(model.User)

	if err := r.DB.First(user, "ID = ?", userID).Error; err != nil {
		return "error user not found!", nil
	}

	arrLen := (len(user.ConnectRequest) - 1)
	newArrReq := make([]string, arrLen)
	k := 0
	for i := 0; i < arrLen; {
		if user.ConnectRequest[i] != sender {
			newArrReq[i] = user.ConnectRequest[k]
			k++
			i++
		} else {
			k++
		}
	}
	user.ConnectRequest = newArrReq
	return "Success", r.DB.Save(user).Error
}

// RemoveRequestConnectTo is the resolver for the removeRequestConnectTo field.
func (r *mutationResolver) RemoveRequestConnectTo(ctx context.Context, userID string, recepient string) (string, error) {
	user := new(model.User)

	if err := r.DB.First(user, "ID = ?", userID).Error; err != nil {
		return "Error while getting user", err
	}

	arrLen := (len(user.RequestConnectTo) - 1)
	newArrReq := make([]string, arrLen)
	k := 0
	for i := 0; i < arrLen; {
		if user.RequestConnectTo[i] != recepient {
			newArrReq[i] = user.RequestConnectTo[k]
			k++
			i++
		} else {
			k++
		}
	}
	user.RequestConnectTo = newArrReq
	return "Success", r.DB.Save(user).Error
}

// FollowUser is the resolver for the followUser field.
func (r *mutationResolver) FollowUser(ctx context.Context, userID string, recepient string) (string, error) {
	user := new(model.User)
	if err := r.DB.First(user, "ID = ?", userID).Error; err != nil {
		return "Error while getting user", err
	}

	user.FollowedUser = append(user.FollowedUser, recepient)

	return "Success", r.DB.Save(user).Error
}

// UnfollowUser is the resolver for the unfollowUser field.
func (r *mutationResolver) UnfollowUser(ctx context.Context, userID string, recepient string) (string, error) {
	user := new(model.User)

	if err := r.DB.First(user, "ID = ?", userID).Error; err != nil {
		return "Error while getting user", err
	}

	arrLen := (len(user.FollowedUser) - 1)
	newArr := make([]string, arrLen)
	k := 0
	for i := 0; i < arrLen; {
		if user.FollowedUser[i] != recepient {
			newArr[i] = user.FollowedUser[k]
			k++
			i++
		} else {
			k++
		}
	}
	user.FollowedUser = newArr
	return "Success remove", r.DB.Save(user).Error
}

// BlockUser is the resolver for the blockUser field.
func (r *mutationResolver) BlockUser(ctx context.Context, userID string, recepient string) (string, error) {
	user := new(model.User)
	if err := r.DB.First(user, "ID = ?", userID).Error; err != nil {
		return "Error while getting user", err
	}

	user.BlockedUser = append(user.BlockedUser, recepient)

	return "Blocked", r.DB.Save(user).Error
}

// UnblockUser is the resolver for the unblockUser field.
func (r *mutationResolver) UnblockUser(ctx context.Context, userID string, recepient string) (string, error) {
	user := new(model.User)

	if err := r.DB.First(user, "ID = ?", userID).Error; err != nil {
		return "Error while getting user", err
	}

	arrLen := (len(user.BlockedUser) - 1)
	newArr := make([]string, arrLen)
	k := 0
	for i := 0; i < arrLen; {
		if user.BlockedUser[i] != recepient {
			newArr[i] = user.BlockedUser[k]
			k++
			i++
		} else {
			k++
		}
	}
	user.BlockedUser = newArr
	return "unblocked", r.DB.Save(user).Error
}

// GetUserByEmail is the resolver for the getUserByEmail field.
func (r *queryResolver) GetUserByEmail(ctx context.Context, email string) (*model.User, error) {
	var user *model.User
	err := r.DB.Model(user).Where("Email LIKE ?", email).Take(&user).Error
	if err != nil {
		return nil, err
	}
	return user, nil
}

// GetUserByID is the resolver for the getUserByID field.
func (r *queryResolver) GetUserByID(ctx context.Context, id string) (*model.User, error) {
	var user *model.User
	err := r.DB.Model(user).Where("ID LIKE ?", id).Take(&user).Error
	if err != nil {
		return nil, err
	}
	return user, nil
}

// TestMiddleware is the resolver for the testMiddleware field.
func (r *queryResolver) TestMiddleware(ctx context.Context) (string, error) {
	return "success", nil
}

// ConnectRequest is the resolver for the connectRequest field.
func (r *userResolver) ConnectRequest(ctx context.Context, obj *model.User) ([]string, error) {
	return obj.ConnectRequest, nil
}

// RequestConnectTo is the resolver for the requestConnectTo field.
func (r *userResolver) RequestConnectTo(ctx context.Context, obj *model.User) ([]string, error) {
	return obj.RequestConnectTo, nil
}

// ConnectedUser is the resolver for the connectedUser field.
func (r *userResolver) ConnectedUser(ctx context.Context, obj *model.User) ([]string, error) {
	return obj.ConnectedUser, nil
}

// FollowedUser is the resolver for the followedUser field.
func (r *userResolver) FollowedUser(ctx context.Context, obj *model.User) ([]string, error) {
	return obj.FollowedUser, nil
}

// BlockedUser is the resolver for the blockedUser field.
func (r *userResolver) BlockedUser(ctx context.Context, obj *model.User) ([]string, error) {
	return obj.BlockedUser, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
