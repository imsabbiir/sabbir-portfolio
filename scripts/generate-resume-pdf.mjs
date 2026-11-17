import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateResumePdf() {
  const doc = await PDFDocument.create();
  
  // Standard A4: 595.28 x 841.89 points
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const page = doc.addPage([pageWidth, pageHeight]);

  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  // Margins
  const marginX = 40;
  const contentWidth = pageWidth - marginX * 2;
  let cursorY = pageHeight - 40;

  // Colors
  const primaryNavy = rgb(15 / 255, 59 / 255, 112 / 255); // #0f3b70
  const darkText = rgb(25 / 255, 30 / 255, 36 / 255);     // #191e24
  const bodyText = rgb(51 / 255, 65 / 255, 85 / 255);     // #334155
  const linkBlue = rgb(37 / 255, 99 / 255, 235 / 255);    // #2563eb
  const dividerGray = rgb(203 / 255, 213 / 255, 225 / 255); // #cbd5e1

  // Helper to wrap text into lines
  function wrapText(text, maxWidth, font, fontSize) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, fontSize);
      if (width <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  // Draw Header
  page.drawText('SABBIR AHMED MRIDUL', {
    x: marginX,
    y: cursorY,
    size: 20,
    font: fontBold,
    color: primaryNavy,
  });
  cursorY -= 17;

  page.drawText('Junior Frontend Developer', {
    x: marginX,
    y: cursorY,
    size: 11,
    font: fontBold,
    color: linkBlue,
  });
  cursorY -= 14;

  const contactLine1 = 'Rupganj, Narayanganj, Dhaka  |  +880 1326-650567  |  imsabbiir@gmail.com';
  page.drawText(contactLine1, {
    x: marginX,
    y: cursorY,
    size: 9,
    font: fontRegular,
    color: bodyText,
  });
  cursorY -= 13;

  const contactLine2 = 'linkedin.com/in/imsabbir  |  https://github.com/imsabbiir  |  imsabbir.xyz';
  page.drawText(contactLine2, {
    x: marginX,
    y: cursorY,
    size: 9,
    font: fontRegular,
    color: linkBlue,
  });
  cursorY -= 10;

  // Horizontal Header Divider
  page.drawLine({
    start: { x: marginX, y: cursorY },
    end: { x: pageWidth - marginX, y: cursorY },
    thickness: 1.5,
    color: primaryNavy,
  });
  cursorY -= 14;

  // Helper for Section Titles
  function drawSectionTitle(title) {
    page.drawText(title, {
      x: marginX,
      y: cursorY,
      size: 10,
      font: fontBold,
      color: primaryNavy,
    });
    cursorY -= 4;
    page.drawLine({
      start: { x: marginX, y: cursorY },
      end: { x: pageWidth - marginX, y: cursorY },
      thickness: 0.6,
      color: dividerGray,
    });
    cursorY -= 10;
  }

  // Helper for Bullet Point
  function drawBulletItem(prefix, body, indent = 12) {
    const bulletX = marginX + indent;
    const textX = bulletX + 8;
    const textMaxWidth = contentWidth - indent - 8;

    page.drawText('•', {
      x: bulletX,
      y: cursorY,
      size: 9,
      font: fontBold,
      color: primaryNavy,
    });

    const fullText = prefix ? `${prefix}: ${body}` : body;
    const lines = wrapText(fullText, textMaxWidth, fontRegular, 8.5);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (i === 0 && prefix) {
        // Draw bold prefix first
        const prefixWithColon = `${prefix}: `;
        const prefixWidth = fontBold.widthOfTextAtSize(prefixWithColon, 8.5);
        page.drawText(prefixWithColon, {
          x: textX,
          y: cursorY,
          size: 8.5,
          font: fontBold,
          color: darkText,
        });
        const restOfFirstLine = line.slice(prefixWithColon.length);
        page.drawText(restOfFirstLine, {
          x: textX + prefixWidth,
          y: cursorY,
          size: 8.5,
          font: fontRegular,
          color: bodyText,
        });
      } else {
        page.drawText(line, {
          x: textX,
          y: cursorY,
          size: 8.5,
          font: fontRegular,
          color: bodyText,
        });
      }
      cursorY -= 11;
    }
    cursorY -= 1.5;
  }

  // 1. PROFESSIONAL SUMMARY
  drawSectionTitle('PROFESSIONAL SUMMARY');
  const summaryText =
    'Junior Frontend Developer with 2.5+ years of hands-on experience coding and building responsive, scalable web applications using JavaScript (ES6+), TypeScript, React.js, and Next.js. Skilled in modern UI development with Tailwind CSS, state management via Redux Toolkit and Context API, and full-stack integration using REST APIs, Next API, MongoDB. Experienced in architecting polished, production-ready web projects and improving page load speed by up to 35% through clean code and AI-assisted workflows.';
  const summaryLines = wrapText(summaryText, contentWidth, fontRegular, 8.5);
  for (const line of summaryLines) {
    page.drawText(line, {
      x: marginX,
      y: cursorY,
      size: 8.5,
      font: fontRegular,
      color: bodyText,
    });
    cursorY -= 11.5;
  }
  cursorY -= 5;

  // 2. CORE COMPETENCIES & TECHNICAL SKILLS
  drawSectionTitle('CORE COMPETENCIES & TECHNICAL SKILLS');
  drawBulletItem('Frontend', 'HTML5, CSS3, JavaScript (ES6+), TypeScript, React.js, Next.js, Tailwind CSS, Responsive Web Design.');
  drawBulletItem('State & Backend', 'Redux Toolkit, Context API, REST APIs, Next API, MongoDB, Node.js, NestJS.');
  drawBulletItem('Tools & Deployment', 'Git, GitHub, Vercel, VS Code.');
  drawBulletItem('AI-Assisted Development', 'ChatGPT, Claude, Gemini (AI-Assisted Coding, Debugging, Code Review & Prompt Engineering).');
  drawBulletItem('Soft Skills', 'Communication, Public Speaking, Team Management, Problem Solving, Cross-Functional Collaboration.');
  cursorY -= 5;

  // 3. PROFESSIONAL EXPERIENCE
  drawSectionTitle('PROFESSIONAL EXPERIENCE');
  // Job Title Line with Right-aligned Date
  const roleText = 'WordPress Developer  |  IN Technology Ltd. (Mirpur, Dhaka)';
  const dateText = '2022 – 2023';
  page.drawText(roleText, {
    x: marginX,
    y: cursorY,
    size: 9,
    font: fontBold,
    color: darkText,
  });
  const dateWidth = fontBold.widthOfTextAtSize(dateText, 9);
  page.drawText(dateText, {
    x: pageWidth - marginX - dateWidth,
    y: cursorY,
    size: 9,
    font: fontBold,
    color: darkText,
  });
  cursorY -= 12;

  drawBulletItem('Theme & Plugin Customization', 'Customized 8+ WordPress themes and plugins to match client branding and requirements.');
  drawBulletItem('UI/UX & Bug Resolution', 'Resolved 20+ UI/UX layout issues, broken links, and CSS conflicts across device viewports.');
  drawBulletItem('Performance Optimization', 'Improved page load speeds by 30% via image compression, asset minification, and responsive fixes.');
  drawBulletItem('Site Maintenance', 'Managed ongoing content updates, plugin upgrades, and routine security checks across client sites.');
  drawBulletItem('Team Collaboration', 'Collaborated with a 3-member team to translate UI mockups into clean, production-ready pages.');
  cursorY -= 5;

  // 4. PROJECTS
  drawSectionTitle('PROJECTS');
  
  // Project 1: BPSKF
  const p1Title = 'Organization Website – BPSKF';
  const p1Tech = 'Technologies: Next.js, Tailwind CSS, Next API, MongoDB';
  page.drawText(p1Title, {
    x: marginX,
    y: cursorY,
    size: 9,
    font: fontBold,
    color: darkText,
  });
  const p1TitleWidth = fontBold.widthOfTextAtSize(p1Title, 9);
  page.drawText(`  |  ${p1Tech}`, {
    x: marginX + p1TitleWidth,
    y: cursorY,
    size: 8.5,
    font: fontOblique,
    color: bodyText,
  });
  cursorY -= 12;

  drawBulletItem('Architecture & UI', 'Built a production portal with 15+ reusable Next.js components and Tailwind CSS for responsiveness.');
  drawBulletItem('Backend & Engagement', 'Engineed 6+ Next API endpoints with MongoDB for dynamic content, donations, and contact forms.');
  drawBulletItem('Error Handling', 'Eliminated UI crashes during async data fetching using loading skeletons and fallback error states.');
  drawBulletItem('Speed & Compatibility', 'Boosted initial page rendering speed by 35% and ensured cross-browser compatibility.');
  
  // Live Demo links
  page.drawText('Live Demo: https://bpskf.vercel.app  |  Git Repo: https://github.com/imsabbiir/bpskf', {
    x: marginX + 20,
    y: cursorY,
    size: 8,
    font: fontRegular,
    color: linkBlue,
  });
  cursorY -= 14;

  // Project 2: Yejara
  const p2Title = 'Yejara E-Commerce Platform';
  const p2Tech = 'Technologies: Next.js, Tailwind CSS, Next API, MongoDB';
  page.drawText(p2Title, {
    x: marginX,
    y: cursorY,
    size: 9,
    font: fontBold,
    color: darkText,
  });
  const p2TitleWidth = fontBold.widthOfTextAtSize(p2Title, 9);
  page.drawText(`  |  ${p2Tech}`, {
    x: marginX + p2TitleWidth,
    y: cursorY,
    size: 8.5,
    font: fontOblique,
    color: bodyText,
  });
  cursorY -= 12;

  drawBulletItem('End-to-End Workflow', 'Architected an e-commerce platform with authentication, 100+ product catalog, and order processing.');
  drawBulletItem('Product Discovery', 'Built real-time multi-criteria filtering, keyword search, and category navigation via REST APIs.');
  drawBulletItem('State Synchronization', 'Resolved cart state synchronization and persistence across 10+ routes using Context API.');
  drawBulletItem('Performance Optimization', 'Reduced initial load time by 40% via lazy loading, Next.js image optimization, and code splitting.');
  
  page.drawText('Live Demo: https://yejara.vercel.app  |  Git Repo: https://github.com/imsabbiir/yejara', {
    x: marginX + 20,
    y: cursorY,
    size: 8,
    font: fontRegular,
    color: linkBlue,
  });
  cursorY -= 14;

  // 5. EDUCATION
  drawSectionTitle('EDUCATION');
  
  // Edu 1
  const edu1 = 'B.Sc. in Computer Science  |  Southeast University (Tejgaon, Dhaka)';
  const edu1Date = '2022 – Present';
  page.drawText(edu1, {
    x: marginX,
    y: cursorY,
    size: 8.5,
    font: fontBold,
    color: darkText,
  });
  const edu1DateWidth = fontBold.widthOfTextAtSize(edu1Date, 8.5);
  page.drawText(edu1Date, {
    x: pageWidth - marginX - edu1DateWidth,
    y: cursorY,
    size: 8.5,
    font: fontBold,
    color: darkText,
  });
  cursorY -= 13;

  // Edu 2
  const edu2 = 'Diploma in Computer  |  Narsingdi Polytechnic Institute (Police-line, Narsingdi)';
  const edu2Date = '2017 – 2021';
  page.drawText(edu2, {
    x: marginX,
    y: cursorY,
    size: 8.5,
    font: fontBold,
    color: darkText,
  });
  const edu2DateWidth = fontBold.widthOfTextAtSize(edu2Date, 8.5);
  page.drawText(edu2Date, {
    x: pageWidth - marginX - edu2DateWidth,
    y: cursorY,
    size: 8.5,
    font: fontBold,
    color: darkText,
  });
  cursorY -= 14;

  // 6. CERTIFICATIONS & SPECIALIZED COURSES
  drawSectionTitle('CERTIFICATIONS & SPECIALIZED COURSES');
  drawBulletItem('Office Specialist', 'Microsoft Office Application Specialist 3 Months, 2014–2015 – Excel Dashboards, Word, PowerPoint, Access.');
  drawBulletItem('Responsive Web Design', 'Responsive Web Design Course 8 Months, 2019–2020 – In Creative IT Institute.');
  drawBulletItem('Self-Directed Modern Stack Mastery', 'hands-on mastery of React, Next, Next API, TypeScript, Tailwind CSS, MongoDB, and Redux.');

  // Save to public/sabbir-resume.pdf
  const pdfBytes = await doc.save();
  const outputPath = path.resolve(process.cwd(), 'public', 'sabbir-resume.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Generated resume PDF successfully at ${outputPath} (${pdfBytes.length} bytes)`);
}

generateResumePdf().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
