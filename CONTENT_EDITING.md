# Content Editing Guide

This guide explains how to update the website content without modifying code. All content is stored in JSON files in the `/data` directory.

## Overview

The website content is separated from code in two main files:
- `/data/profile.json` - Personal info, experience, skills, education
- `/data/projects.json` - Project details and descriptions

## Editing Profile Information

### File: `/data/profile.json`

#### Personal Information
```json
{
  "personal": {
    "name": "Girish Watwani",
    "location": "Abu Dhabi, UAE",
    "role": "AI-Focused Full Stack Developer",
    "contact": {
      "phone": "+971503214652",
      "email": "girish.watwani2008@gmail.com",
      "linkedin": "linkedin.com/in/girish-watwani/",
      "github": "https://github.com/girish2408"
    }
  }
}
```

**To update**: Simply edit the values in this section. Changes will appear on:
- Home page hero
- Contact page
- Resume page
- Footer (if added)

#### Experience

Each experience entry has:
- `company`: Company name
- `role`: Job title
- `period`: Time period (e.g., "2020-2023")
- `highlights`: Array of achievement strings
- `technologies`: Array of technology names

**Example**:
```json
{
  "company": "Emirates NBD / D4Insight",
  "role": "AI-Focused Full Stack Developer",
  "period": "Recent",
  "highlights": [
    "Built Node.js microservices for wealth trading journeys",
    "Implemented gold buy/sell/redeem workflows"
  ],
  "technologies": ["Node.js", "TypeScript", "Kafka"]
}
```

**To add a new experience**:
1. Copy an existing entry
2. Update all fields
3. Add it to the `experience` array

**To update existing experience**:
1. Find the entry in the `experience` array
2. Modify fields as needed
3. Save the file

#### Skills

Skills are organized by category:
- `ai`: AI/ML technologies
- `backend`: Backend technologies
- `frontend`: Frontend technologies
- `infrastructure`: DevOps/infrastructure
- `databases`: Database technologies
- `testing`: Testing frameworks
- `messaging`: Messaging systems

**To add a skill**:
1. Find the appropriate category
2. Add the skill name to the array
3. Save the file

**Example**:
```json
{
  "skills": {
    "ai": ["LangChain", "LangGraph", "OpenAI API", "NEW_SKILL_HERE"]
  }
}
```

#### Projects (Summary)

The `projects` array in `profile.json` is a summary. Full details are in `projects.json`.

**To update**: Edit the summary entries here, but detailed updates should be in `projects.json`.

## Editing Projects

### File: `/data/projects.json`

Each project has:
- `id`: Unique identifier (used internally)
- `name`: Project name
- `description`: Short description (shown in cards)
- `longDescription`: Detailed description (shown in modal)
- `deployment`: Deployment platform (e.g., "Railway")
- `liveUrl`: Live website URL (optional)
- `githubUrl`: GitHub repository URL (optional)
- `technologies`: Array of technology names
- `architecture`: Object with architecture details
- `highlights`: Array of key highlights

**Example**:
```json
{
  "id": "stock-insights",
  "name": "Stock Insights Dashboard",
  "description": "A real-time stock market insights dashboard",
  "longDescription": "Detailed description here...",
  "deployment": "Railway",
  "liveUrl": "https://stock-insights.railway.app",
  "githubUrl": "https://github.com/girish2408/stock-insights",
  "technologies": ["Next.js", "TypeScript"],
  "architecture": {
    "frontend": "Next.js with App Router",
    "backend": "Node.js API routes"
  },
  "highlights": [
    "Real-time data streaming",
    "Interactive charts"
  ]
}
```

**To add a new project**:
1. Copy an existing project entry
2. Update all fields with new project details
3. Ensure `id` is unique
4. Add to the `projects` array
5. Save the file

**To update an existing project**:
1. Find the project by `id` or `name`
2. Update any fields
3. Save the file

**To remove a project**:
1. Find the project entry
2. Remove it from the array
3. Save the file

## Editing Education

### File: `/data/profile.json`

```json
{
  "education": {
    "degree": "MS AI",
    "status": "In Progress"
  }
}
```

**To update**: Simply modify the values. You can add more fields if needed (e.g., `university`, `year`).

## Best Practices

1. **Backup First**: Always backup JSON files before editing
2. **Validate JSON**: Use a JSON validator to ensure syntax is correct
3. **Test Locally**: After editing, run `npm run dev` to test changes
4. **Consistent Formatting**: Keep arrays and objects properly formatted
5. **Unique IDs**: Ensure project IDs are unique
6. **No Code Changes**: Only edit JSON files, not TypeScript/TSX files

## Common Updates

### Adding a New Skill
1. Open `/data/profile.json`
2. Find the appropriate category in `skills`
3. Add the skill name to the array
4. Save and test

### Updating Contact Information
1. Open `/data/profile.json`
2. Navigate to `personal.contact`
3. Update the relevant field
4. Save and test

### Adding Work Experience
1. Open `/data/profile.json`
2. Find the `experience` array
3. Add a new entry with all required fields
4. Save and test

### Updating Project Details
1. Open `/data/projects.json`
2. Find the project by `id` or `name`
3. Update fields as needed
4. Save and test

## Troubleshooting

### JSON Syntax Errors
- Use a JSON validator (e.g., jsonlint.com)
- Check for missing commas, brackets, or quotes
- Ensure all strings are in double quotes

### Changes Not Appearing
1. Restart the dev server (`npm run dev`)
2. Clear browser cache
3. Check browser console for errors

### Missing Fields
- Check the examples in this guide
- Ensure all required fields are present
- Refer to existing entries for structure

## Advanced: Adding New Fields

If you want to add new fields (e.g., `certifications`, `awards`):

1. Add the field to the JSON structure
2. Update the relevant page component to display it
3. This requires code changes - see component files in `/app` and `/components`

## Need Help?

If you need to make structural changes or add new features, refer to:
- Component files in `/components`
- Page files in `/app`
- TypeScript types in `/lib`

For content-only updates, stick to the JSON files in `/data`.
