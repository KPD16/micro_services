package user

import "github.com/gin-gonic/gin"

func RegisterRoutes(route *gin.RouterGroup) {
	userService := UserService{}
	userController := UserController{service: userService}

	route.POST("/user/onboard", userController.OnboardUser)
}
