import { Document, Page, Text, View, StyleSheet, Link, Font, Svg, Path } from '@react-pdf/renderer';
import { resumeData } from '../data/resume';

// Register Google Font (Inter) for a modern, ATS-friendly typographic look
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeA.woff' }, // Regular
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZJhjp-Ek-_EeA.woff', fontStyle: 'italic' },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZJhjp-Ek-_EeA.woff', fontWeight: 700 }, // Bold
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontFamily: 'Inter',
    fontSize: 9.5,
    color: '#1A1A1A',
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 14,
    borderBottom: '1pt solid #E9ECEF',
    paddingBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: '#1A1A1A',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: 700,
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 6,
    columnGap: 12,
    color: '#4A4A4A',
    fontSize: 9,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    width: 9,
    height: 9,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#10b981',
    borderBottom: '1pt solid #E9ECEF',
    paddingBottom: 2,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  paragraph: {
    color: '#4A4A4A',
    marginBottom: 3,
    textAlign: 'justify',
  },
  itemRow: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  itemTitle: {
    fontWeight: 700,
    color: '#1A1A1A',
    fontSize: 10.5,
  },
  itemSubtitle: {
    fontStyle: 'italic',
    color: '#4A4A4A',
    fontSize: 9.5,
    marginBottom: 2,
  },
  itemDate: {
    color: '#10b981',
    fontWeight: 700,
    fontSize: 8.5,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletPointText: {
    color: '#4A4A4A',
    flex: 1,
    paddingLeft: 6,
  },
  bulletPointDot: {
    width: 8,
    fontSize: 9.5,
    color: '#10b981',
    marginTop: -1,
  },
  skillsGrid: {
    flexDirection: 'column',
  },
  skillRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  skillCategory: {
    fontWeight: 700,
    width: 85,
    color: '#1A1A1A',
  },
  skillItems: {
    flex: 1,
    color: '#4A4A4A',
  },
  link: {
    color: '#10b981',
    textDecoration: 'none',
  },
  footer: {
    position: 'absolute',
    bottom: 12,
    left: 24,
    right: 24,
    textAlign: 'center',
    color: '#717171',
    fontSize: 7,
    borderTop: '1pt solid #E9ECEF',
    paddingTop: 4,
  }
});

// A mini-parser to apply bold weight to text enclosed in **
const ParsedText = ({ text }: { text: string }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <Text>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <Text key={i} style={{ fontWeight: 700, color: '#1A1A1A' }}>
              {part.slice(2, -2)}
            </Text>
          );
        }
        return <Text key={i}>{part}</Text>;
      })}
    </Text>
  );
};

const BulletPoint = ({ children }: { children: string }) => (
  <View style={styles.bulletPoint}>
    <Text style={styles.bulletPointDot}>•</Text>
    <View style={styles.bulletPointText}>
      <ParsedText text={children} />
    </View>
  </View>
);

const PhoneIcon = () => (
  <Svg viewBox="0 0 24 24" style={styles.icon} fill="none" stroke="#10b981" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Svg>
);

const MailIcon = () => (
  <Svg viewBox="0 0 24 24" style={styles.icon} fill="none" stroke="#10b981" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <Path d="M22 6l-10 7L2 6" />
  </Svg>
);

const GithubIcon = () => (
  <Svg viewBox="0 0 24 24" style={styles.icon} fill="none" stroke="#10b981" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </Svg>
);

const LinkedinIcon = () => (
  <Svg viewBox="0 0 24 24" style={styles.icon} fill="none" stroke="#10b981" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <Path d="M2 9h4v12H2z" />
    <Path d="M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  </Svg>
);

const MapPinIcon = () => (
  <Svg viewBox="0 0 24 24" style={styles.icon} fill="none" stroke="#10b981" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <Path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
  </Svg>
);


export const ResumePDF = () => {
  const workExperience = resumeData.experience.filter(item => item.type === 'work');
  const projectExperience = resumeData.experience.filter(item => item.type === 'project');

  // get project link by matching name
  const getProjectUrl = (name: string) => {
    // Attempt to match the exact name without the self-directed tag
    const cleanName = name.replace(' (Self-directed)', '').trim();
    const proj = resumeData.projects?.find(p => p.name === cleanName);
    return proj?.codeUrl || proj?.liveUrl;
  };

  return (
    <Document title="Fredrick_Nyangau_CV">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.header.name}</Text>
          <Text style={styles.title}>{resumeData.header.title}</Text>
          <View style={styles.contactRow}>
            <View style={styles.contactItem}>
              <MapPinIcon />
              <Text>{resumeData.header.location}</Text>
            </View>
            <View style={styles.contactItem}>
              <PhoneIcon />
              <Text>{resumeData.header.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <MailIcon />
              <Link src={`mailto:${resumeData.header.email}`} style={styles.link}>{resumeData.header.email}</Link>
            </View>
            <View style={styles.contactItem}>
              <LinkedinIcon />
              <Link src={`https://${resumeData.header.linkedin}`} style={styles.link}>{resumeData.header.linkedin}</Link>
            </View>
            <View style={styles.contactItem}>
              <GithubIcon />
              <Link src={`https://${resumeData.header.github}`} style={styles.link}>{resumeData.header.github}</Link>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Profile</Text>
          <Text style={styles.paragraph}>{resumeData.profile}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <View style={styles.skillsGrid}>
            {resumeData.skills.map((skill, index) => (
              <View key={index} style={styles.skillRow}>
                <Text style={styles.skillCategory}>{skill.category}:</Text>
                <Text style={styles.skillItems}>{skill.items}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {workExperience.map((exp) => (
            <View key={exp.id} style={styles.itemRow}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{exp.role} - {exp.org}</Text>
                <Text style={styles.itemDate}>{exp.period}</Text>
              </View>
              <Text style={styles.itemSubtitle}>{exp.location}</Text>
              {exp.bullets.map((bullet, idx) => (
                <BulletPoint key={idx}>{bullet}</BulletPoint>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Projects</Text>
          {projectExperience.map((exp) => {
            const url = getProjectUrl(exp.org);
            return (
              <View key={exp.id} style={styles.itemRow}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>
                    {exp.role} - {url ? <Link src={url} style={styles.link}>{exp.org}</Link> : exp.org}
                  </Text>
                  <Text style={styles.itemDate}>{exp.period}</Text>
                </View>
                <Text style={styles.itemSubtitle}>{exp.location}</Text>
                {exp.bullets.map((bullet, idx) => (
                  <BulletPoint key={idx}>{bullet}</BulletPoint>
                ))}
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.itemRow}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{resumeData.education.degree}</Text>
              <Text style={styles.itemDate}>{resumeData.education.date}</Text>
            </View>
            <Text style={styles.itemSubtitle}>{resumeData.education.institution}, {resumeData.education.location}</Text>
            <Text style={styles.paragraph}>{resumeData.education.honors}</Text>
            <Text style={styles.paragraph}>{resumeData.education.coursework}</Text>
          </View>
        </View>

        <Text style={styles.footer} fixed>
          Last Updated: {new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })} • Auto-generated from fredricknyangau.vercel.app
        </Text>
      </Page>
    </Document>
  );
};
