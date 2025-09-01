# 🔔 Commit Notification System

This repository includes an automated notification system that alerts users whenever new commits are made to the Educational Portal.

## Features

✅ **Automated GitHub Actions workflow** that triggers on every push to main/master branches  
✅ **Email notifications** with detailed commit information  
✅ **Slack notifications** for team collaboration  
✅ **Web-based notification signup** page  
✅ **Notification history tracking**  
✅ **Multiple notification channels** support  

## How It Works

The notification system uses GitHub Actions to automatically detect new commits and send notifications through various channels:

1. **GitHub Actions Workflow**: `.github/workflows/commit-notification.yml`
   - Triggers on push events to main/master branches
   - Triggers on merged pull requests
   - Extracts commit information (author, message, date, etc.)
   - Sends notifications via configured channels

2. **Notification Channels**:
   - **Email**: HTML-formatted emails with commit details
   - **Slack**: Rich message cards with action buttons
   - **GitHub Actions Summary**: Built-in GitHub notifications

3. **Web Interface**: `html/notifications.html`
   - User-friendly signup page for notifications
   - Multiple notification method selection
   - Instructions for setup and configuration

## Setup Instructions

### For Repository Administrators

#### Email Notifications
1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add the following **Secrets**:
   - `EMAIL_USERNAME`: Your Gmail address (e.g., `notifications@yourdomain.com`)
   - `EMAIL_PASSWORD`: Gmail app password (not your regular password)
3. Add the following **Variables**:
   - `NOTIFICATION_EMAIL`: Email address to receive notifications

#### Slack Notifications
1. Create a Slack webhook URL in your Slack workspace
2. Add the following **Variable**:
   - `SLACK_WEBHOOK_URL`: Your Slack webhook URL

#### Getting Gmail App Password
1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account settings → Security → App passwords
3. Generate an app password for "Mail"
4. Use this app password as `EMAIL_PASSWORD` secret

### For Users

#### Option 1: Web Interface
1. Visit the [Notifications Page](html/notifications.html)
2. Select your preferred notification method
3. Follow the setup instructions provided

#### Option 2: GitHub Built-in Notifications
1. **Star** and **Watch** this repository
2. Go to repository → **Watch** → **All Activity**
3. Configure your GitHub notification preferences

## Notification Content

Each notification includes:

- 📝 **Commit message** and description
- 👤 **Author** information
- 📅 **Date and time** of commit
- 🔗 **Direct links** to view the commit and repository
- 📊 **Repository** name and branch information

## Example Notification

```
🚀 New Commit in ITSNISTAV/Educational-Portal

Author: John Doe
Date: 2025-01-01
Message: Add new course module for Machine Learning

[View Commit] [View Repository]
```

## File Structure

```
Educational-Portal/
├── .github/
│   └── workflows/
│       └── commit-notification.yml    # GitHub Actions workflow
├── html/
│   └── notifications.html             # Web notification signup page
├── notifications/                     # Notification logs (auto-generated)
└── NOTIFICATIONS.md                   # This documentation
```

## Testing the System

To test if notifications are working:

1. Make a small commit to the repository
2. Check the GitHub Actions tab for workflow execution
3. Verify notifications were sent to configured channels
4. Check the `notifications/` directory for log files

## Customization

### Adding New Notification Channels

To add support for new notification services:

1. Edit `.github/workflows/commit-notification.yml`
2. Add a new step with the appropriate action
3. Configure required secrets/variables
4. Update the web interface if needed

### Modifying Notification Content

You can customize the notification templates by editing:
- Email HTML template in the workflow file
- Slack payload structure
- Notification log format

## Troubleshooting

### Common Issues

1. **Notifications not sending**:
   - Check if secrets and variables are properly configured
   - Verify the workflow has necessary permissions
   - Check GitHub Actions logs for error messages

2. **Email notifications failing**:
   - Ensure Gmail app password is correct
   - Verify 2-factor authentication is enabled
   - Check if the sender email is valid

3. **Slack notifications not working**:
   - Verify webhook URL is correct and active
   - Check Slack workspace permissions
   - Test webhook URL manually

### Getting Help

If you encounter issues:
1. Check the [GitHub Actions logs](../../actions)
2. Review this documentation
3. Open an issue in the repository
4. Contact the repository administrators

## Contributing

To improve the notification system:
1. Fork the repository
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

**Note**: This notification system respects GitHub's rate limits and terms of service. All notifications are sent responsibly and include unsubscribe options where applicable.