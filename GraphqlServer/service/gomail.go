package service

import (
	gomail "gopkg.in/gomail.v2"
)

func SendEmail(receiver string, subject string, message string) {

	msg := gomail.NewMessage()
	msg.SetHeader("From", "budimanoey2@gmail.com")
	msg.SetHeader("To", receiver)
	msg.SetHeader("Subject", subject)
	msg.SetBody("text/html", message)

	n := gomail.NewDialer("smtp.gmail.com", 587, "budimanoey2@gmail.com", "xmemjrgcfdhjjbtg")

	// Send the email
	if err := n.DialAndSend(msg); err != nil {
		panic(err)
	}

}
