const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Priority keywords
const PRIORITY = {
    '🔴 CRITICAL': ['security', 'breaking', 'hotfix', 'critical'],
    '🟡 HIGH': ['feature', 'add', 'implement', 'new'],
    '🟢 MEDIUM': ['fix', 'bug', 'update', 'improve'],
    '🔵 LOW': ['refactor', 'cleanup', 'typo', 'deps']
};

function getPriority(message) {
    for (const [level, keywords] of Object.entries(PRIORITY)) {
        if (keywords.some(kw => message.toLowerCase().includes(kw))) return level;
    }
    return '🔵 LOW';
}

function generateLog() {
    const today = new Date().toISOString().split('T')[0];
    const logDir = path.join(__dirname, '..', 'logs');

    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

    // Get today's commits
    let commits = [];
    try {
        const log = execSync(`git log --since="midnight" --pretty=format:"%h|%s|%an" --no-merges`, { encoding: 'utf-8' });
        commits = log.split('\n').filter(Boolean).map(line => {
            const [hash, msg, author] = line.split('|');
            return { hash, msg, author, priority: getPriority(msg) };
        });
    } catch (e) {
        console.log('No git commits today or no git repo');
    }

    // Group by priority
    const grouped = {};
    commits.forEach(c => {
        if (!grouped[c.priority]) grouped[c.priority] = [];
        grouped[c.priority].push(c);
    });

    // Generate markdown
    let md = `# 📅 Dev Log - ${today}\n\n`;
    md += `**Commits**: ${commits.length}\n\n---\n\n`;

    const order = ['🔴 CRITICAL', '🟡 HIGH', '🟢 MEDIUM', '🔵 LOW'];
    order.forEach(priority => {
        if (!grouped[priority]) return;
        md += `## ${priority}\n\n`;
        grouped[priority].forEach(c => {
            md += `- ${c.msg} \`${c.hash}\`\n`;
        });
        md += `\n`;
    });

    const filename = path.join(logDir, `${today}.md`);
    fs.writeFileSync(filename, md);
    console.log(`✅ Log saved: ${filename}`);
}

generateLog();
