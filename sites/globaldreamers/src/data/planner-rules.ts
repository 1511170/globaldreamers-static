// Reglas de descalificación para el planner condicional de Global Dreamers
// Basado en perfiles genuinos definidos por el equipo comercial (abril 2026)

export interface ProfileAnswers {
  age: string;
  education: string;
  englishLevel: string;
  workExperience: string;
  financialCapacity: string;
  hasSponsor: string;
}

export interface DisqualificationRule {
  id: string;
  message: string;
  subtext: string;
  pdfSection: string;
}

export interface CountryRules {
  country: string;
  countryName: string;
  visaCost: string;
  course6Months: string;
  course12Months: string;
  funds6Months: string;
  funds12Months: string;
  workAllowed: string;
  minAge: number;
  maxAgeRecommended: number;
  checkProfile: (answers: ProfileAnswers) => DisqualificationRule | null;
}

const AGE_RANGES = {
  '18-22': { min: 18, max: 22, label: '18-22 años' },
  '23-27': { min: 23, max: 27, label: '23-27 años' },
  '28-35': { min: 28, max: 35, label: '28-35 años' },
  '36-40': { min: 36, max: 40, label: '36-40 años' },
  '40+': { min: 40, max: 99, label: '40+ años' },
};

function getAgeRange(ageKey: string): { min: number; max: number } | null {
  const range = AGE_RANGES[ageKey as keyof typeof AGE_RANGES];
  return range || null;
}

// Mensaje genérico de despedida amable
const FAREWELL_MESSAGE = 'Lamentablemente en esta ocasión no podríamos ayudarte. Te deseamos mucho éxito.';

// ============================================
// REGLAS POR PAÍS
// ============================================

export const countryRules: Record<string, CountryRules> = {
  australia: {
    country: 'australia',
    countryName: 'Australia',
    visaCost: 'AUD $2,000',
    course6Months: 'AUD $6,000 - $7,000',
    course12Months: 'AUD $12,000 - $14,000',
    funds6Months: 'AUD $17,355',
    funds12Months: 'AUD $29,710',
    workAllowed: '24 horas/semana. Tiempo completo en vacaciones.',
    minAge: 18,
    maxAgeRecommended: 35,
    checkProfile: (answers) => {
      const ageRange = getAgeRange(answers.age);
      const ageMin = ageRange?.min || 0;

      // 35+ sin maestría o universidad → descalificado
      if (ageMin >= 36 && answers.education !== 'master' && answers.education !== 'university') {
        return {
          id: 'age_education',
          message: FAREWELL_MESSAGE,
          subtext: 'Para mayores de 35 años, Australia requiere perfil académico sólido (maestría o carrera universitaria).',
          pdfSection: 'education',
        };
      }

      // 28-35 sin carrera universitaria → descalificado
      if (ageMin >= 28 && ageMin <= 35 && answers.education !== 'university' && answers.education !== 'master') {
        return {
          id: 'age28_no_degree',
          message: FAREWELL_MESSAGE,
          subtext: 'Entre 28-35 años, Australia requiere carrera universitaria completa y buena historia laboral.',
          pdfSection: 'education',
        };
      }

      // 23-27 sin carrera y sin trabajar → descalificado
      if (ageMin >= 23 && ageMin <= 27 && answers.education !== 'university' && answers.education !== 'master' && answers.workExperience === 'none') {
        return {
          id: 'age23_no_degree_no_work',
          message: FAREWELL_MESSAGE,
          subtext: 'Entre 23-27 años, necesitas carrera universitaria o experiencia laboral comprobable.',
          pdfSection: 'work_experience',
        };
      }

      // 28+ con capacidad financiera limitada y sin patrocinio → descalificado
      if (ageMin >= 28 && answers.financialCapacity === 'limited' && answers.hasSponsor !== 'full') {
        return {
          id: 'age28_no_funds',
          message: FAREWELL_MESSAGE,
          subtext: 'Para mayores de 28 años, el soporte financiero debe estar solventado al 100% por el aplicante. No se acepta patrocinio parcial.',
          pdfSection: 'financial',
        };
      }

      return null;
    },
  },

  canada: {
    country: 'canada',
    countryName: 'Canadá',
    visaCost: 'CAD $150',
    course6Months: 'CAD $7,000 - $9,000',
    course12Months: 'CAD $15,000 - $23,000',
    funds6Months: 'CAD $10,318',
    funds12Months: 'CAD $20,635',
    workAllowed: 'NO se permite trabajar si estudias solo inglés. Solo en programas de high education.',
    minAge: 18,
    maxAgeRecommended: 35,
    checkProfile: (answers) => {
      const ageRange = getAgeRange(answers.age);
      const ageMin = ageRange?.min || 0;

      // 35+ sin maestría o universidad → descalificado
      if (ageMin >= 36 && answers.education !== 'master' && answers.education !== 'university') {
        return {
          id: 'age_education',
          message: FAREWELL_MESSAGE,
          subtext: 'Para mayores de 35 años, Canadá requiere perfil académico sólido (maestría o carrera universitaria).',
          pdfSection: 'education',
        };
      }

      // 28-35 sin carrera universitaria → descalificado
      if (ageMin >= 28 && ageMin <= 35 && answers.education !== 'university' && answers.education !== 'master') {
        return {
          id: 'age28_no_degree',
          message: FAREWELL_MESSAGE,
          subtext: 'Entre 28-35 años, Canadá requiere carrera universitaria completa y buena historia laboral.',
          pdfSection: 'education',
        };
      }

      // 23-27 sin carrera y sin trabajar → descalificado
      if (ageMin >= 23 && ageMin <= 27 && answers.education !== 'university' && answers.education !== 'master' && answers.workExperience === 'none') {
        return {
          id: 'age23_no_degree_no_work',
          message: FAREWELL_MESSAGE,
          subtext: 'Entre 23-27 años, necesitas carrera universitaria o experiencia laboral comprobable.',
          pdfSection: 'work_experience',
        };
      }

      // 28+ con capacidad financiera limitada y sin patrocinio → descalificado
      if (ageMin >= 28 && answers.financialCapacity === 'limited' && answers.hasSponsor !== 'full') {
        return {
          id: 'age28_no_funds',
          message: FAREWELL_MESSAGE,
          subtext: 'Para mayores de 28 años, el soporte financiero debe estar solventado al 100% por el aplicante.',
          pdfSection: 'financial',
        };
      }

      return null;
    },
  },

  'nueva-zelanda': {
    country: 'nueva-zelanda',
    countryName: 'Nueva Zelanda',
    visaCost: 'NZD $850',
    course6Months: 'NZD $6,000 - $9,000',
    course12Months: 'NZD $13,000 - $20,000',
    funds6Months: 'NZD $10,000',
    funds12Months: 'NZD $20,000',
    workAllowed: '20 horas/semana. Tiempo completo en vacaciones.',
    minAge: 18,
    maxAgeRecommended: 35,
    checkProfile: (answers) => {
      const ageRange = getAgeRange(answers.age);
      const ageMin = ageRange?.min || 0;

      if (ageMin >= 36 && answers.education !== 'master' && answers.education !== 'university') {
        return { id: 'age_education', message: FAREWELL_MESSAGE, subtext: 'Para mayores de 35 años, Nueva Zelanda requiere perfil académico sólido.', pdfSection: 'education' };
      }
      if (ageMin >= 28 && ageMin <= 35 && answers.education !== 'university' && answers.education !== 'master') {
        return { id: 'age28_no_degree', message: FAREWELL_MESSAGE, subtext: 'Entre 28-35 años, Nueva Zelanda requiere carrera universitaria completa.', pdfSection: 'education' };
      }
      if (ageMin >= 23 && ageMin <= 27 && answers.education !== 'university' && answers.education !== 'master' && answers.workExperience === 'none') {
        return { id: 'age23_no_degree_no_work', message: FAREWELL_MESSAGE, subtext: 'Entre 23-27 años, necesitas carrera universitaria o experiencia laboral.', pdfSection: 'work_experience' };
      }
      if (ageMin >= 28 && answers.financialCapacity === 'limited' && answers.hasSponsor !== 'full') {
        return { id: 'age28_no_funds', message: FAREWELL_MESSAGE, subtext: 'Para mayores de 28 años, el soporte financiero debe estar solventado al 100%.', pdfSection: 'financial' };
      }
      return null;
    },
  },

  malta: {
    country: 'malta',
    countryName: 'Malta',
    visaCost: '€100',
    course6Months: '€2,400 - €4,800',
    course12Months: '€5,000 - €10,000',
    funds6Months: '€8,100',
    funds12Months: '€16,000',
    workAllowed: '20 horas/semana. SOLO después de 3 meses de estudios.',
    minAge: 18,
    maxAgeRecommended: 35,
    checkProfile: (answers) => {
      const ageRange = getAgeRange(answers.age);
      const ageMin = ageRange?.min || 0;

      // Malta es menos exigente pero aplica filtros básicos
      if (ageMin >= 40 && answers.education === 'highschool' && answers.workExperience === 'none') {
        return { id: 'age40_weak_profile', message: FAREWELL_MESSAGE, subtext: 'Para mayores de 40 años con perfil académico básico y sin experiencia, Malta también tiene limitaciones.', pdfSection: 'work_experience' };
      }
      if (ageMin >= 28 && answers.financialCapacity === 'limited' && answers.hasSponsor !== 'full' && answers.hasSponsor !== 'partial') {
        return { id: 'no_funds', message: FAREWELL_MESSAGE, subtext: 'Necesitas demostrar capacidad financiera adecuada o contar con patrocinio.', pdfSection: 'financial' };
      }
      return null;
    },
  },

  'estados-unidos': {
    country: 'estados-unidos',
    countryName: 'Estados Unidos',
    visaCost: 'USD $350',
    course6Months: 'USD $6,000 - $11,000',
    course12Months: 'USD $13,000 - $23,000',
    funds6Months: 'USD $6,000',
    funds12Months: 'USD $12,000',
    workAllowed: 'NO se permite trabajar con visa de estudiante F-1.',
    minAge: 18,
    maxAgeRecommended: 35,
    checkProfile: (answers) => {
      const ageRange = getAgeRange(answers.age);
      const ageMin = ageRange?.min || 0;

      if (ageMin >= 36 && answers.education !== 'master' && answers.education !== 'university') {
        return { id: 'age_education', message: FAREWELL_MESSAGE, subtext: 'Para mayores de 35 años, USA requiere perfil académico sólido.', pdfSection: 'education' };
      }
      if (ageMin >= 28 && ageMin <= 35 && answers.education !== 'university' && answers.education !== 'master') {
        return { id: 'age28_no_degree', message: FAREWELL_MESSAGE, subtext: 'Entre 28-35 años, USA requiere carrera universitaria completa.', pdfSection: 'education' };
      }
      if (ageMin >= 23 && ageMin <= 27 && answers.education !== 'university' && answers.education !== 'master' && answers.workExperience === 'none') {
        return { id: 'age23_no_degree_no_work', message: FAREWELL_MESSAGE, subtext: 'Entre 23-27 años, necesitas carrera universitaria o experiencia laboral.', pdfSection: 'work_experience' };
      }
      if (ageMin >= 28 && answers.financialCapacity === 'limited' && answers.hasSponsor !== 'full') {
        return { id: 'age28_no_funds', message: FAREWELL_MESSAGE, subtext: 'En USA no puedes trabajar con visa de estudiante. Tu proyecto debe estar 100% financiado.', pdfSection: 'financial' };
      }
      return null;
    },
  },
};

// Opciones para las preguntas del planner
export const plannerQuestions = {
  age: {
    question: '¿Cuál es tu rango de edad?',
    options: [
      { value: '18-22', label: '18-22 años', icon: 'school' },
      { value: '23-27', label: '23-27 años', icon: 'person' },
      { value: '28-35', label: '28-35 años', icon: 'work' },
      { value: '36-40', label: '36-40 años', icon: 'badge' },
      { value: '40+', label: '40+ años', icon: 'elderly' },
    ],
  },
  education: {
    question: '¿Cuál es tu nivel educativo más alto?',
    options: [
      { value: 'highschool', label: 'Bachillerato / Secundaria', icon: 'school' },
      { value: 'technical', label: 'Técnico / Tecnólogo', icon: 'build' },
      { value: 'university', label: 'Carrera Universitaria', icon: 'workspace_premium' },
      { value: 'master', label: 'Maestría / Posgrado', icon: 'stars' },
    ],
  },
  englishLevel: {
    question: '¿Cuál es tu nivel de inglés actual?',
    options: [
      { value: 'none', label: 'Ninguno / Básico', icon: 'translate' },
      { value: 'basic', label: 'Básico (A1-A2)', icon: 'chat_bubble' },
      { value: 'intermediate', label: 'Intermedio (B1-B2)', icon: 'record_voice_over' },
      { value: 'advanced', label: 'Avanzado (C1-C2)', icon: 'psychology' },
    ],
  },
  workExperience: {
    question: '¿Cuántos años de experiencia laboral tienes?',
    options: [
      { value: 'none', label: 'Ninguna', icon: 'person_off' },
      { value: 'less-1', label: 'Menos de 1 año', icon: 'timer' },
      { value: '1-3', label: '1-3 años', icon: 'work_history' },
      { value: '3-5', label: '3-5 años', icon: 'trending_up' },
      { value: '5+', label: '5+ años', icon: 'military_tech' },
    ],
  },
  financialCapacity: {
    question: '¿Cómo describes tu capacidad financiera?',
    options: [
      { value: 'limited', label: 'Limitada', icon: 'savings' },
      { value: 'adequate', label: 'Adecuada', icon: 'account_balance_wallet' },
      { value: 'comfortable', label: 'Cómoda', icon: 'payments' },
      { value: 'excellent', label: 'Excelente', icon: 'diamond' },
    ],
  },
  hasSponsor: {
    question: '¿Tienes patrocinio familiar?',
    options: [
      { value: 'none', label: 'No tengo patrocinio', icon: 'person' },
      { value: 'partial', label: 'Patrocinio parcial', icon: 'group' },
      { value: 'full', label: 'Patrocinio 100% familia', icon: 'family_restroom' },
    ],
  },
};

export const pdfDownloadPath = '/downloads/guia-orientacion-perfil.pdf';
