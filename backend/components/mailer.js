const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class Mailer {
	constructor(){
		this.to = '';
		this.from = 'noreply-qa-app@sendgrid.com';
		this.subject = 'Password reset';
		this.text = 'Your new password is: ';
		this.html = this.text;
	}

	reset(){
		this.to = '';
		this.from = 'noreply-qa-app@sendgrid.com';
		this.subject = 'Password reset';
		this.text = 'Your new password is: ';
		this.html = this.text;
	}

	setDestination(email){
		this.to = email;
	}

	addPassword(password){
		this.text += password;
	}

	sendMessage(){
		sgMail.send({
			to: this.to,
			from: this.from,
			subject: this.subject,
			text: this.text,
			html: this.html,
		});
	}
}

module.exports = Mailer;
