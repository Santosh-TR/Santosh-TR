# 📋 Daily Log System - Quick Guide

## ✅ What's Working

Your daily log system is now set up and generates color-coded logs from git commits:

- 🔴 **CRITICAL**: security, breaking, hotfix, critical
- 🟡 **HIGH**: feature, add, implement, new  
- 🟢 **MEDIUM**: fix, bug, update, improve
- 🔵 **LOW**: refactor, cleanup, typo, deps

---

## 🚀 Usage

### Manual Generation
**Option 1**: Double-click `Daily Log.bat`  
**Option 2**: Run `node scripts/daily-log.js`

Logs save to: `logs/YYYY-MM-DD.md`

---

## ⏰ Automatic Daily Generation

### Windows Task Scheduler Setup

1. **Open Task Scheduler**
   - Press `Win + R`
   - Type `taskschd.msc`
   - Press Enter

2. **Create Task**
   - Click "Create Basic Task"
   - Name: `Daily Development Log`
   - Trigger: `Daily`
   - Time: `11:30 PM` (or your preferred time)

3. **Action**
   - Action: `Start a program`
   - Program: `node.exe`
   - Arguments: `scripts/daily-log.js`
   - Start in: `d:\Portfolio Santosh TR try 2\osmo-clone`

4. **Save and Test**

---

## 📊 Sample Log

```markdown
# 📅 Dev Log - 2026-01-18

**Commits**: 2

---

## 🟢 MEDIUM

- fix: CDN configuration for Sanity image hosting `3d01c2f`

## 🔵 LOW

- refactor: Optimize daily log generation for token efficiency `8f82ab8`
```

---

## 🔧 Customization

Edit `scripts/daily-log.js` to change:
- Priority keywords
- Log format
- File location
- Color emojis
