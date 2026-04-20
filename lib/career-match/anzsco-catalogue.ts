// ANZSCO 职业代码目录（精选 150+ 常见代码）
//
// 这是一个静态参考库，作为 LLM 匹配的"基线"。
// LLM 可以推荐目录之外的职业，但目录里的优先考虑。
// 各种清单（CSOL/MLTSSL/STSOL/ROL/各州）的最新归属由 web search 实时核实。
//
// 数据来源：ABS ANZSCO 1220.0 + Home Affairs 各种清单

export type AnzscoEntry = {
  code: string;       // 6 位 ANZSCO 代码
  nameEn: string;     // 英文官方名
  nameZh: string;     // 中文常用名
  domain: Domain;     // 大分类
  subDomain?: string; // 细分（可选）
  assessmentBody: string; // 评估机构
  typicalEducation: string; // 典型学历背景
  typicalExperience: string; // 典型工作经历
  notes?: string;
};

export type Domain =
  | "ICT"          // 信息技术
  | "Engineering"  // 工程
  | "Health"       // 医疗护理
  | "Science"      // 科学研究
  | "Education"    // 教育教师
  | "Accounting"   // 会计金融
  | "Business"     // 商业管理
  | "Trades"       // 技工建筑
  | "Creative"     // 创意设计
  | "Social"       // 社会服务
  | "Hospitality"  // 酒店旅游
  | "Agriculture"; // 农业

export const ANZSCO_CATALOGUE: AnzscoEntry[] = [
  // ════════════════════════════════════════════
  // ICT 信息技术（ACS 评估）
  // ════════════════════════════════════════════
  { code: "261111", nameEn: "ICT Business Analyst", nameZh: "ICT 业务分析师", domain: "ICT", assessmentBody: "ACS", typicalEducation: "ICT/商科本科以上", typicalExperience: "需求分析、流程优化" },
  { code: "261112", nameEn: "Systems Analyst", nameZh: "系统分析师", domain: "ICT", assessmentBody: "ACS", typicalEducation: "计算机相关本科", typicalExperience: "系统分析、设计" },
  { code: "261211", nameEn: "Multimedia Specialist", nameZh: "多媒体专家", domain: "ICT", assessmentBody: "ACS", typicalEducation: "数字媒体/计算机本科", typicalExperience: "多媒体内容制作" },
  { code: "261212", nameEn: "Web Developer", nameZh: "Web 开发员", domain: "ICT", assessmentBody: "ACS", typicalEducation: "计算机本科", typicalExperience: "前后端开发" },
  { code: "261311", nameEn: "Analyst Programmer", nameZh: "分析程序员", domain: "ICT", assessmentBody: "ACS", typicalEducation: "计算机本科", typicalExperience: "分析+编码" },
  { code: "261312", nameEn: "Developer Programmer", nameZh: "开发程序员", domain: "ICT", assessmentBody: "ACS", typicalEducation: "计算机本科", typicalExperience: "纯开发岗位" },
  { code: "261313", nameEn: "Software Engineer", nameZh: "软件工程师", domain: "ICT", assessmentBody: "ACS", typicalEducation: "计算机/软工本科", typicalExperience: "软件开发、架构" },
  { code: "261314", nameEn: "Software Tester", nameZh: "软件测试工程师", domain: "ICT", assessmentBody: "ACS", typicalEducation: "计算机本科", typicalExperience: "QA、自动化测试" },
  { code: "261399", nameEn: "Software and Applications Programmers nec", nameZh: "其他软件应用程序员", domain: "ICT", assessmentBody: "ACS", typicalEducation: "计算机本科", typicalExperience: "其他细分软件岗" },
  { code: "262111", nameEn: "Database Administrator", nameZh: "数据库管理员", domain: "ICT", assessmentBody: "ACS", typicalEducation: "计算机本科", typicalExperience: "DBA、数据库优化" },
  { code: "262112", nameEn: "ICT Security Specialist", nameZh: "信息安全专家", domain: "ICT", assessmentBody: "ACS", typicalEducation: "计算机/安全本科", typicalExperience: "网络安全、渗透测试" },
  { code: "262113", nameEn: "Systems Administrator", nameZh: "系统管理员", domain: "ICT", assessmentBody: "ACS", typicalEducation: "计算机/IT 大专以上", typicalExperience: "运维、系统维护" },
  { code: "263111", nameEn: "Computer Network and Systems Engineer", nameZh: "计算机网络系统工程师", domain: "ICT", assessmentBody: "ACS", typicalEducation: "计算机/网络本科", typicalExperience: "网络架构、运维" },
  { code: "263112", nameEn: "Network Administrator", nameZh: "网络管理员", domain: "ICT", assessmentBody: "ACS", typicalEducation: "计算机/IT 大专", typicalExperience: "网络配置维护" },
  { code: "263113", nameEn: "Network Analyst", nameZh: "网络分析师", domain: "ICT", assessmentBody: "ACS", typicalEducation: "计算机本科", typicalExperience: "网络性能分析" },
  { code: "263211", nameEn: "ICT Quality Assurance Engineer", nameZh: "ICT 质量保证工程师", domain: "ICT", assessmentBody: "ACS", typicalEducation: "计算机本科", typicalExperience: "QA 体系" },
  { code: "263212", nameEn: "ICT Support Engineer", nameZh: "ICT 支持工程师", domain: "ICT", assessmentBody: "ACS", typicalEducation: "计算机大专", typicalExperience: "技术支持" },
  { code: "263213", nameEn: "ICT Systems Test Engineer", nameZh: "ICT 系统测试工程师", domain: "ICT", assessmentBody: "ACS", typicalEducation: "计算机本科", typicalExperience: "系统测试" },
  { code: "224711", nameEn: "Management Consultant", nameZh: "管理咨询顾问", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "商科/MBA", typicalExperience: "咨询、流程优化" },
  { code: "135112", nameEn: "ICT Project Manager", nameZh: "ICT 项目经理", domain: "ICT", assessmentBody: "ACS", typicalEducation: "计算机本科 + PM 经验", typicalExperience: "5+ 年 IT 项目管理" },

  // ════════════════════════════════════════════
  // Engineering 工程（EA 评估）
  // ════════════════════════════════════════════
  { code: "233111", nameEn: "Chemical Engineer", nameZh: "化学工程师", domain: "Engineering", assessmentBody: "EA", typicalEducation: "化学工程本科", typicalExperience: "化工厂、流程设计" },
  { code: "233112", nameEn: "Materials Engineer", nameZh: "材料工程师", domain: "Engineering", assessmentBody: "EA", typicalEducation: "材料工程本科", typicalExperience: "材料研发" },
  { code: "233211", nameEn: "Civil Engineer", nameZh: "土木工程师", domain: "Engineering", assessmentBody: "EA", typicalEducation: "土木工程本科", typicalExperience: "建筑、基建设计" },
  { code: "233212", nameEn: "Geotechnical Engineer", nameZh: "岩土工程师", domain: "Engineering", assessmentBody: "EA", typicalEducation: "岩土工程本科", typicalExperience: "地质勘察" },
  { code: "233213", nameEn: "Quantity Surveyor", nameZh: "工程造价师", domain: "Engineering", assessmentBody: "AIQS", typicalEducation: "工程造价本科", typicalExperience: "造价咨询" },
  { code: "233214", nameEn: "Structural Engineer", nameZh: "结构工程师", domain: "Engineering", assessmentBody: "EA", typicalEducation: "结构工程本科", typicalExperience: "结构设计" },
  { code: "233215", nameEn: "Transport Engineer", nameZh: "交通工程师", domain: "Engineering", assessmentBody: "EA", typicalEducation: "交通工程本科", typicalExperience: "交通规划" },
  { code: "233311", nameEn: "Electrical Engineer", nameZh: "电气工程师", domain: "Engineering", assessmentBody: "EA", typicalEducation: "电气工程本科", typicalExperience: "电力系统设计" },
  { code: "233411", nameEn: "Electronics Engineer", nameZh: "电子工程师", domain: "Engineering", assessmentBody: "EA", typicalEducation: "电子工程本科", typicalExperience: "电子产品研发" },
  { code: "233511", nameEn: "Industrial Engineer", nameZh: "工业工程师", domain: "Engineering", assessmentBody: "EA", typicalEducation: "工业工程本科", typicalExperience: "生产管理" },
  { code: "233512", nameEn: "Mechanical Engineer", nameZh: "机械工程师", domain: "Engineering", assessmentBody: "EA", typicalEducation: "机械工程本科", typicalExperience: "机械设计、制造" },
  { code: "233513", nameEn: "Production or Plant Engineer", nameZh: "生产工程师", domain: "Engineering", assessmentBody: "EA", typicalEducation: "机械/工业本科", typicalExperience: "工厂生产" },
  { code: "233611", nameEn: "Mining Engineer", nameZh: "采矿工程师", domain: "Engineering", assessmentBody: "EA", typicalEducation: "采矿工程本科", typicalExperience: "矿山设计运营" },
  { code: "233612", nameEn: "Petroleum Engineer", nameZh: "石油工程师", domain: "Engineering", assessmentBody: "EA", typicalEducation: "石油工程本科", typicalExperience: "油气开采" },
  { code: "233911", nameEn: "Aeronautical Engineer", nameZh: "航空工程师", domain: "Engineering", assessmentBody: "EA", typicalEducation: "航空工程本科", typicalExperience: "飞机设计" },
  { code: "233912", nameEn: "Agricultural Engineer", nameZh: "农业工程师", domain: "Engineering", assessmentBody: "EA", typicalEducation: "农业工程本科", typicalExperience: "农机/农业系统" },
  { code: "233913", nameEn: "Biomedical Engineer", nameZh: "生物医学工程师", domain: "Engineering", assessmentBody: "EA", typicalEducation: "生物医学工程本科", typicalExperience: "医疗器械研发" },
  { code: "233914", nameEn: "Engineering Technologist", nameZh: "工程技术员", domain: "Engineering", assessmentBody: "EA", typicalEducation: "工程相关本科", typicalExperience: "技术岗位" },
  { code: "233915", nameEn: "Environmental Engineer", nameZh: "环境工程师", domain: "Engineering", assessmentBody: "EA", typicalEducation: "环境工程本科", typicalExperience: "环境治理" },
  { code: "233916", nameEn: "Naval Architect", nameZh: "船舶工程师", domain: "Engineering", assessmentBody: "EA", typicalEducation: "船舶工程本科", typicalExperience: "船舶设计" },
  { code: "263311", nameEn: "Telecommunications Engineer", nameZh: "电信工程师", domain: "Engineering", assessmentBody: "EA", typicalEducation: "电信/通信本科", typicalExperience: "电信网络设计" },

  // ════════════════════════════════════════════
  // Health 医疗护理
  // ════════════════════════════════════════════
  { code: "253111", nameEn: "General Practitioner", nameZh: "全科医生", domain: "Health", assessmentBody: "AHPRA + AMC/RACGP", typicalEducation: "医学本科 MBBS", typicalExperience: "持医师执照 + 实习完成" },
  { code: "253411", nameEn: "Specialist Physician (General Medicine)", nameZh: "内科专科医生", domain: "Health", assessmentBody: "AHPRA + RACP", typicalEducation: "医学本科 + 专科训练", typicalExperience: "FRACP" },
  { code: "253711", nameEn: "Diagnostic and Interventional Radiologist", nameZh: "放射科医生", domain: "Health", assessmentBody: "AHPRA + RANZCR", typicalEducation: "医学本科 + 专科", typicalExperience: "FRANZCR" },
  { code: "252411", nameEn: "Occupational Therapist", nameZh: "职业治疗师", domain: "Health", assessmentBody: "OTC", typicalEducation: "OT 本科", typicalExperience: "OT 临床实习" },
  { code: "252511", nameEn: "Physiotherapist", nameZh: "物理治疗师", domain: "Health", assessmentBody: "APC", typicalEducation: "物理治疗本科", typicalExperience: "PT 临床" },
  { code: "252611", nameEn: "Podiatrist", nameZh: "足科医生", domain: "Health", assessmentBody: "PodiatryBoard", typicalEducation: "足部医学本科", typicalExperience: "足科诊所" },
  { code: "252711", nameEn: "Audiologist", nameZh: "听力学家", domain: "Health", assessmentBody: "Audiology Australia", typicalEducation: "听力学硕士", typicalExperience: "听力检测" },
  { code: "252712", nameEn: "Speech Pathologist", nameZh: "言语治疗师", domain: "Health", assessmentBody: "SPA", typicalEducation: "言语病理学本/硕", typicalExperience: "言语治疗临床" },
  { code: "254411", nameEn: "Nurse Practitioner", nameZh: "执业护士", domain: "Health", assessmentBody: "ANMAC", typicalEducation: "护理硕士", typicalExperience: "护士执照 + 高级培训" },
  { code: "254412", nameEn: "Registered Nurse (Aged Care)", nameZh: "注册护士（老年护理）", domain: "Health", assessmentBody: "ANMAC", typicalEducation: "护理本科", typicalExperience: "老年护理经验" },
  { code: "254415", nameEn: "Registered Nurse (Medical)", nameZh: "注册护士（内科）", domain: "Health", assessmentBody: "ANMAC", typicalEducation: "护理本科", typicalExperience: "医院内科" },
  { code: "254418", nameEn: "Registered Nurse (Surgical)", nameZh: "注册护士（外科）", domain: "Health", assessmentBody: "ANMAC", typicalEducation: "护理本科", typicalExperience: "外科手术室" },
  { code: "254421", nameEn: "Enrolled Nurse", nameZh: "登记护士", domain: "Health", assessmentBody: "ANMAC", typicalEducation: "护理大专", typicalExperience: "基础护理" },
  { code: "251211", nameEn: "Medical Diagnostic Radiographer", nameZh: "医疗影像技师", domain: "Health", assessmentBody: "AIR", typicalEducation: "医学影像本科", typicalExperience: "X 光、CT、MRI" },
  { code: "251411", nameEn: "Optometrist", nameZh: "验光师", domain: "Health", assessmentBody: "OCANZ", typicalEducation: "验光学本/硕", typicalExperience: "眼科诊所" },
  { code: "251513", nameEn: "Retail Pharmacist", nameZh: "药剂师（零售）", domain: "Health", assessmentBody: "APC", typicalEducation: "药剂学本科", typicalExperience: "药店执业" },
  { code: "252112", nameEn: "Acupuncturist", nameZh: "针灸师", domain: "Health", assessmentBody: "CMBA", typicalEducation: "中医针灸本科", typicalExperience: "中医针灸临床" },
  { code: "272314", nameEn: "Psychologist", nameZh: "心理学家", domain: "Health", assessmentBody: "PsyBA", typicalEducation: "心理学本+硕", typicalExperience: "临床心理咨询" },
  { code: "252312", nameEn: "Dentist", nameZh: "牙医", domain: "Health", assessmentBody: "ADC", typicalEducation: "牙医学本科", typicalExperience: "持牙医执照" },
  { code: "411711", nameEn: "Personal Care Assistant", nameZh: "个人护理助理", domain: "Health", assessmentBody: "TRA", typicalEducation: "Cert III/IV", typicalExperience: "老年护理证书" },

  // ════════════════════════════════════════════
  // Science 科学研究（Research/Lab）—— 重点扩展
  // ════════════════════════════════════════════
  { code: "234111", nameEn: "Agricultural Consultant", nameZh: "农业顾问", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "农学本科", typicalExperience: "农业咨询" },
  { code: "234112", nameEn: "Agricultural Scientist", nameZh: "农业科学家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "农学本/硕/博", typicalExperience: "农业研究" },
  { code: "234113", nameEn: "Forester", nameZh: "林业学家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "林学本科", typicalExperience: "林业管理" },
  { code: "234211", nameEn: "Chemist", nameZh: "化学家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "化学本/硕/博", typicalExperience: "化学研究、分析", notes: "实验室科研背景常匹配" },
  { code: "234212", nameEn: "Food Technologist", nameZh: "食品技术专家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "食品科学本科", typicalExperience: "食品研发" },
  { code: "234213", nameEn: "Wine Maker", nameZh: "酿酒师", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "葡萄酒酿造本科", typicalExperience: "酒厂经验" },
  { code: "234311", nameEn: "Conservation Officer", nameZh: "环境保护官", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "环境/生态本科", typicalExperience: "环保项目" },
  { code: "234312", nameEn: "Environmental Consultant", nameZh: "环境顾问", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "环境科学本科", typicalExperience: "环境评估" },
  { code: "234313", nameEn: "Environmental Research Scientist", nameZh: "环境研究科学家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "环境科学硕/博", typicalExperience: "实验室+野外" },
  { code: "234314", nameEn: "Park Ranger", nameZh: "公园管理员", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "环境本科", typicalExperience: "公园保护" },
  { code: "234399", nameEn: "Environmental Scientists nec", nameZh: "其他环境科学家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "环境本/硕", typicalExperience: "环境研究" },
  { code: "234411", nameEn: "Geologist", nameZh: "地质学家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "地质学本/硕", typicalExperience: "勘探、矿产" },
  { code: "234412", nameEn: "Geophysicist", nameZh: "地球物理学家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "地球物理本/硕", typicalExperience: "勘探" },
  { code: "234413", nameEn: "Hydrogeologist", nameZh: "水文地质学家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "水文地质本/硕", typicalExperience: "地下水研究" },
  { code: "234511", nameEn: "Life Scientist (General)", nameZh: "生命科学家（通用）", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "生物学本/硕/博", typicalExperience: "生物实验室", notes: "生物科研背景常匹配" },
  { code: "234513", nameEn: "Biochemist", nameZh: "生物化学家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "生化本/硕/博", typicalExperience: "生化实验" },
  { code: "234514", nameEn: "Biotechnologist", nameZh: "生物技术专家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "生物技术本/硕", typicalExperience: "生物技术研发" },
  { code: "234515", nameEn: "Botanist", nameZh: "植物学家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "植物学本/硕", typicalExperience: "植物研究" },
  { code: "234516", nameEn: "Marine Biologist", nameZh: "海洋生物学家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "海洋生物本/硕", typicalExperience: "海洋研究" },
  { code: "234517", nameEn: "Microbiologist", nameZh: "微生物学家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "微生物本/硕", typicalExperience: "微生物实验" },
  { code: "234518", nameEn: "Zoologist", nameZh: "动物学家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "动物学本/硕", typicalExperience: "动物研究" },
  { code: "234599", nameEn: "Life Scientists nec", nameZh: "其他生命科学家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "生物相关硕/博", typicalExperience: "实验室科研", notes: "覆盖各类生物研究岗" },
  { code: "234611", nameEn: "Medical Laboratory Scientist", nameZh: "医学实验室科学家", domain: "Science", assessmentBody: "AIMS", typicalEducation: "医学实验本/硕", typicalExperience: "医学化验、病理", notes: "医院实验室、检验科" },
  { code: "234711", nameEn: "Veterinarian", nameZh: "兽医", domain: "Science", assessmentBody: "AVBC", typicalEducation: "兽医学本科", typicalExperience: "动物诊疗" },
  { code: "234911", nameEn: "Conservator", nameZh: "文物保护专家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "文保本/硕", typicalExperience: "博物馆" },
  { code: "234912", nameEn: "Metallurgist", nameZh: "冶金学家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "冶金本/硕", typicalExperience: "金属研究" },
  { code: "234913", nameEn: "Meteorologist", nameZh: "气象学家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "气象学本/硕", typicalExperience: "气象预报研究" },
  { code: "234914", nameEn: "Physicist", nameZh: "物理学家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "物理学本/硕/博", typicalExperience: "物理研究" },
  { code: "234999", nameEn: "Natural and Physical Science Professionals nec", nameZh: "其他自然/物理科学家", domain: "Science", assessmentBody: "VETASSESS", typicalEducation: "理学硕/博", typicalExperience: "科研、实验室" },

  // ════════════════════════════════════════════
  // Education 教育（AITSL 评估）
  // ════════════════════════════════════════════
  { code: "241111", nameEn: "Early Childhood (Pre-primary School) Teacher", nameZh: "早教教师", domain: "Education", assessmentBody: "AITSL", typicalEducation: "幼教本科", typicalExperience: "学前教育" },
  { code: "241213", nameEn: "Primary School Teacher", nameZh: "小学教师", domain: "Education", assessmentBody: "AITSL", typicalEducation: "小教本科", typicalExperience: "小学执教" },
  { code: "241311", nameEn: "Middle School Teacher (Aus) / Intermediate School Teacher (NZ)", nameZh: "初中教师", domain: "Education", assessmentBody: "AITSL", typicalEducation: "中教本科", typicalExperience: "初中执教" },
  { code: "241411", nameEn: "Secondary School Teacher", nameZh: "中学教师", domain: "Education", assessmentBody: "AITSL", typicalEducation: "中教本科", typicalExperience: "高中执教" },
  { code: "241511", nameEn: "Special Needs Teacher", nameZh: "特教教师", domain: "Education", assessmentBody: "AITSL", typicalEducation: "特教本/硕", typicalExperience: "特殊教育" },
  { code: "242111", nameEn: "University Lecturer", nameZh: "大学讲师", domain: "Education", assessmentBody: "VETASSESS", typicalEducation: "博士", typicalExperience: "高校教学+研究" },
  { code: "249111", nameEn: "Education Adviser", nameZh: "教育顾问", domain: "Education", assessmentBody: "VETASSESS", typicalEducation: "教育本/硕", typicalExperience: "教育咨询" },
  { code: "249311", nameEn: "Teacher of English to Speakers of Other Languages", nameZh: "对外英语教师 TESOL", domain: "Education", assessmentBody: "AITSL", typicalEducation: "TESOL/英语教育", typicalExperience: "对外汉语/英语" },

  // ════════════════════════════════════════════
  // Accounting 会计金融
  // ════════════════════════════════════════════
  { code: "221111", nameEn: "Accountant (General)", nameZh: "普通会计师", domain: "Accounting", assessmentBody: "CPA / CA ANZ / IPA", typicalEducation: "会计本科", typicalExperience: "财务会计" },
  { code: "221112", nameEn: "Management Accountant", nameZh: "管理会计师", domain: "Accounting", assessmentBody: "CPA / CA ANZ / IPA", typicalEducation: "会计本科", typicalExperience: "管理会计" },
  { code: "221113", nameEn: "Taxation Accountant", nameZh: "税务会计师", domain: "Accounting", assessmentBody: "CPA / CA ANZ / IPA", typicalEducation: "会计/税务本科", typicalExperience: "税务事务所" },
  { code: "221213", nameEn: "External Auditor", nameZh: "外部审计师", domain: "Accounting", assessmentBody: "CPA / CA ANZ / IPA", typicalEducation: "会计/审计本科", typicalExperience: "事务所审计" },
  { code: "221214", nameEn: "Internal Auditor", nameZh: "内部审计师", domain: "Accounting", assessmentBody: "VETASSESS", typicalEducation: "会计/审计本科", typicalExperience: "企业内审" },
  { code: "222111", nameEn: "Commodities Trader", nameZh: "商品交易员", domain: "Accounting", assessmentBody: "VETASSESS", typicalEducation: "金融本科", typicalExperience: "商品交易" },
  { code: "222112", nameEn: "Finance Broker", nameZh: "金融经纪人", domain: "Accounting", assessmentBody: "VETASSESS", typicalEducation: "金融本科", typicalExperience: "金融中介" },
  { code: "222211", nameEn: "Financial Market Dealer", nameZh: "金融市场交易员", domain: "Accounting", assessmentBody: "VETASSESS", typicalEducation: "金融本科", typicalExperience: "证券、外汇" },
  { code: "224111", nameEn: "Actuary", nameZh: "精算师", domain: "Accounting", assessmentBody: "Actuaries Institute", typicalEducation: "精算本/硕", typicalExperience: "精算分析" },
  { code: "224311", nameEn: "Economist", nameZh: "经济学家", domain: "Accounting", assessmentBody: "VETASSESS", typicalEducation: "经济学本/硕", typicalExperience: "经济研究" },
  { code: "224511", nameEn: "Land Economist", nameZh: "地产经济师", domain: "Accounting", assessmentBody: "VETASSESS", typicalEducation: "地产经济本科", typicalExperience: "房地产评估" },
  { code: "224512", nameEn: "Valuer", nameZh: "估价师", domain: "Accounting", assessmentBody: "VETASSESS", typicalEducation: "估价/地产本科", typicalExperience: "资产估值" },

  // ════════════════════════════════════════════
  // Business 商业管理
  // ════════════════════════════════════════════
  { code: "132111", nameEn: "Corporate Services Manager", nameZh: "企业服务经理", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "商科本科", typicalExperience: "5+ 年管理" },
  { code: "132211", nameEn: "Finance Manager", nameZh: "财务经理", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "财务本科", typicalExperience: "5+ 年财务管理" },
  { code: "132311", nameEn: "Human Resource Manager", nameZh: "人力资源经理", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "HR/管理本科", typicalExperience: "HR 管理" },
  { code: "132411", nameEn: "Policy and Planning Manager", nameZh: "政策规划经理", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "公共政策本/硕", typicalExperience: "政策研究" },
  { code: "132511", nameEn: "Research and Development Manager", nameZh: "研发经理", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "理工本/硕 + 管理", typicalExperience: "研发团队管理" },
  { code: "133111", nameEn: "Construction Project Manager", nameZh: "建筑项目经理", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "建筑/工程本科", typicalExperience: "工地项目管理" },
  { code: "133112", nameEn: "Project Builder", nameZh: "项目建造商", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "建筑相关", typicalExperience: "建造管理" },
  { code: "133211", nameEn: "Engineering Manager", nameZh: "工程经理", domain: "Business", assessmentBody: "EA + VETASSESS", typicalEducation: "工程本科 + 管理", typicalExperience: "工程项目管理" },
  { code: "133311", nameEn: "Importer / Exporter", nameZh: "进出口经理", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "商科本科", typicalExperience: "外贸" },
  { code: "133411", nameEn: "Manufacturer", nameZh: "制造业管理者", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "工程/管理本科", typicalExperience: "工厂管理" },
  { code: "133512", nameEn: "Production Manager (Manufacturing)", nameZh: "生产经理", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "工程/管理", typicalExperience: "生产线管理" },
  { code: "133611", nameEn: "Supply and Distribution Manager", nameZh: "供应链经理", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "商科本科", typicalExperience: "供应链管理" },
  { code: "139911", nameEn: "Arts Administrator or Manager", nameZh: "艺术管理者", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "艺术管理", typicalExperience: "文化机构" },
  { code: "139914", nameEn: "Quality Assurance Manager", nameZh: "QA 经理", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "工科本科 + QA", typicalExperience: "QA 体系" },
  { code: "149913", nameEn: "Restaurant or Cafe Manager", nameZh: "餐厅经理", domain: "Hospitality", assessmentBody: "VETASSESS", typicalEducation: "酒店管理大专+", typicalExperience: "餐厅管理" },
  { code: "149212", nameEn: "Customer Service Manager", nameZh: "客户服务经理", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "商科本科", typicalExperience: "客服管理" },
  { code: "225111", nameEn: "Advertising Specialist", nameZh: "广告专家", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "广告/传媒本科", typicalExperience: "广告策划" },
  { code: "225112", nameEn: "Market Research Analyst", nameZh: "市场研究分析师", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "市场/统计本科", typicalExperience: "市场调研" },
  { code: "225113", nameEn: "Marketing Specialist", nameZh: "营销专员", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "市场营销本科", typicalExperience: "品牌、推广" },
  { code: "225311", nameEn: "Public Relations Professional", nameZh: "公关专员", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "传媒本科", typicalExperience: "公关" },
  { code: "225411", nameEn: "Sales Representative (Industrial Products)", nameZh: "工业产品销售代表", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "工科+销售", typicalExperience: "B2B 销售" },
  { code: "223111", nameEn: "Human Resource Adviser", nameZh: "HR 顾问", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "HR 本科", typicalExperience: "HR 咨询" },
  { code: "223112", nameEn: "Recruitment Consultant", nameZh: "招聘顾问", domain: "Business", assessmentBody: "VETASSESS", typicalEducation: "HR/心理本科", typicalExperience: "猎头/招聘" },

  // ════════════════════════════════════════════
  // Trades 技工建筑（TRA 评估）
  // ════════════════════════════════════════════
  { code: "351311", nameEn: "Chef", nameZh: "厨师", domain: "Trades", assessmentBody: "TRA", typicalEducation: "Cert IV Commercial Cookery", typicalExperience: "厨房 4+ 年" },
  { code: "351411", nameEn: "Cook", nameZh: "厨工", domain: "Trades", assessmentBody: "TRA", typicalEducation: "Cert III Commercial Cookery", typicalExperience: "厨房经验" },
  { code: "331111", nameEn: "Bricklayer", nameZh: "瓦工", domain: "Trades", assessmentBody: "TRA", typicalEducation: "Cert III", typicalExperience: "砌筑" },
  { code: "331211", nameEn: "Carpenter and Joiner", nameZh: "木工", domain: "Trades", assessmentBody: "TRA", typicalEducation: "Cert III", typicalExperience: "木工细工" },
  { code: "331212", nameEn: "Carpenter", nameZh: "木匠", domain: "Trades", assessmentBody: "TRA", typicalEducation: "Cert III", typicalExperience: "建筑木工" },
  { code: "334111", nameEn: "Plumber (General)", nameZh: "水管工", domain: "Trades", assessmentBody: "TRA", typicalEducation: "Cert III Plumbing", typicalExperience: "水暖安装" },
  { code: "341111", nameEn: "Electrician (General)", nameZh: "电工", domain: "Trades", assessmentBody: "TRA", typicalEducation: "Cert III Electrotechnology", typicalExperience: "电气安装维修" },
  { code: "342111", nameEn: "Airconditioning and Refrigeration Mechanic", nameZh: "空调制冷技师", domain: "Trades", assessmentBody: "TRA", typicalEducation: "Cert III", typicalExperience: "空调制冷" },
  { code: "321111", nameEn: "Automotive Electrician", nameZh: "汽车电工", domain: "Trades", assessmentBody: "TRA", typicalEducation: "Cert III", typicalExperience: "汽车电气" },
  { code: "321211", nameEn: "Motor Mechanic (General)", nameZh: "汽车修理工", domain: "Trades", assessmentBody: "TRA", typicalEducation: "Cert III", typicalExperience: "汽修" },
  { code: "322311", nameEn: "Metal Fabricator", nameZh: "金属加工技师", domain: "Trades", assessmentBody: "TRA", typicalEducation: "Cert III", typicalExperience: "金属加工" },
  { code: "322313", nameEn: "Welder (First Class)", nameZh: "焊工（一级）", domain: "Trades", assessmentBody: "TRA", typicalEducation: "Cert III", typicalExperience: "焊接" },
  { code: "391111", nameEn: "Hairdresser", nameZh: "美发师", domain: "Trades", assessmentBody: "TRA", typicalEducation: "Cert III Hairdressing", typicalExperience: "美发" },
  { code: "452411", nameEn: "Dog Handler or Trainer", nameZh: "犬训", domain: "Trades", assessmentBody: "VETASSESS", typicalEducation: "Cert IV", typicalExperience: "动物训练" },

  // ════════════════════════════════════════════
  // Creative 创意设计
  // ════════════════════════════════════════════
  { code: "232111", nameEn: "Architect", nameZh: "建筑师", domain: "Creative", assessmentBody: "AACA", typicalEducation: "建筑学本/硕", typicalExperience: "建筑设计" },
  { code: "232112", nameEn: "Landscape Architect", nameZh: "景观建筑师", domain: "Creative", assessmentBody: "AILA", typicalEducation: "景观本/硕", typicalExperience: "景观设计" },
  { code: "232211", nameEn: "Cartographer", nameZh: "制图师", domain: "Creative", assessmentBody: "VETASSESS", typicalEducation: "地理/测绘本科", typicalExperience: "地图制作" },
  { code: "232212", nameEn: "Surveyor", nameZh: "测量师", domain: "Creative", assessmentBody: "SSSI", typicalEducation: "测量本科", typicalExperience: "测量" },
  { code: "232311", nameEn: "Fashion Designer", nameZh: "服装设计师", domain: "Creative", assessmentBody: "VETASSESS", typicalEducation: "服装设计本科", typicalExperience: "服装设计" },
  { code: "232312", nameEn: "Industrial Designer", nameZh: "工业设计师", domain: "Creative", assessmentBody: "VETASSESS", typicalEducation: "工业设计本科", typicalExperience: "产品设计" },
  { code: "232313", nameEn: "Jewellery Designer", nameZh: "珠宝设计师", domain: "Creative", assessmentBody: "VETASSESS", typicalEducation: "珠宝设计", typicalExperience: "珠宝设计" },
  { code: "232411", nameEn: "Graphic Designer", nameZh: "平面设计师", domain: "Creative", assessmentBody: "VETASSESS", typicalEducation: "设计本科", typicalExperience: "平面/品牌设计" },
  { code: "232412", nameEn: "Illustrator", nameZh: "插画师", domain: "Creative", assessmentBody: "VETASSESS", typicalEducation: "美术/设计", typicalExperience: "插画" },
  { code: "232413", nameEn: "Multimedia Designer", nameZh: "多媒体设计师", domain: "Creative", assessmentBody: "VETASSESS", typicalEducation: "数字媒体本科", typicalExperience: "多媒体设计" },
  { code: "232414", nameEn: "Web Designer", nameZh: "Web 设计师", domain: "Creative", assessmentBody: "VETASSESS", typicalEducation: "设计/计算机", typicalExperience: "网页 UI 设计" },
  { code: "232511", nameEn: "Interior Designer", nameZh: "室内设计师", domain: "Creative", assessmentBody: "VETASSESS", typicalEducation: "室内设计本科", typicalExperience: "室内装潢" },
  { code: "232611", nameEn: "Urban and Regional Planner", nameZh: "城市规划师", domain: "Creative", assessmentBody: "VETASSESS / PIA", typicalEducation: "城市规划本科", typicalExperience: "城市规划" },
  { code: "212111", nameEn: "Artistic Director", nameZh: "艺术总监", domain: "Creative", assessmentBody: "VETASSESS", typicalEducation: "艺术本/硕", typicalExperience: "艺术导演" },
  { code: "212312", nameEn: "Director (Film, Television, Radio or Stage)", nameZh: "影视导演", domain: "Creative", assessmentBody: "VETASSESS", typicalEducation: "电影本/硕", typicalExperience: "影视导演" },
  { code: "212413", nameEn: "Photographer", nameZh: "摄影师", domain: "Creative", assessmentBody: "VETASSESS", typicalEducation: "摄影本科", typicalExperience: "商业/艺术摄影" },
  { code: "212415", nameEn: "Translator", nameZh: "翻译", domain: "Creative", assessmentBody: "NAATI", typicalEducation: "外语/翻译本科", typicalExperience: "翻译实务" },
  { code: "212416", nameEn: "Interpreter", nameZh: "口译员", domain: "Creative", assessmentBody: "NAATI", typicalEducation: "外语本科", typicalExperience: "口译实务" },

  // ════════════════════════════════════════════
  // Social 社会服务
  // ════════════════════════════════════════════
  { code: "271311", nameEn: "Solicitor", nameZh: "律师", domain: "Social", assessmentBody: "Legal Profession Admission Board", typicalEducation: "法律本科 LLB + PLT", typicalExperience: "律师执业" },
  { code: "272111", nameEn: "Careers Counsellor", nameZh: "职业咨询师", domain: "Social", assessmentBody: "VETASSESS", typicalEducation: "心理/咨询硕", typicalExperience: "职业咨询" },
  { code: "272112", nameEn: "Drug and Alcohol Counsellor", nameZh: "戒毒戒酒咨询师", domain: "Social", assessmentBody: "VETASSESS", typicalEducation: "咨询本/硕", typicalExperience: "戒毒咨询" },
  { code: "272199", nameEn: "Counsellors nec", nameZh: "其他咨询师", domain: "Social", assessmentBody: "VETASSESS", typicalEducation: "咨询本/硕", typicalExperience: "心理咨询" },
  { code: "272211", nameEn: "Minister of Religion", nameZh: "宗教神职人员", domain: "Social", assessmentBody: "VETASSESS", typicalEducation: "神学本/硕", typicalExperience: "神职" },
  { code: "272311", nameEn: "Clinical Psychologist", nameZh: "临床心理学家", domain: "Social", assessmentBody: "PsyBA", typicalEducation: "心理学本+硕", typicalExperience: "临床心理咨询" },
  { code: "272412", nameEn: "Interpreter (deaf signing)", nameZh: "手语翻译", domain: "Social", assessmentBody: "NAATI", typicalEducation: "手语证书", typicalExperience: "手语翻译" },
  { code: "272511", nameEn: "Social Worker", nameZh: "社工", domain: "Social", assessmentBody: "AASW", typicalEducation: "社工本/硕", typicalExperience: "社会工作" },
  { code: "272612", nameEn: "Recreation Officer", nameZh: "康体专员", domain: "Social", assessmentBody: "VETASSESS", typicalEducation: "康体管理本", typicalExperience: "社区康体" },
  { code: "272613", nameEn: "Welfare Worker", nameZh: "福利工作者", domain: "Social", assessmentBody: "ACWA", typicalEducation: "社工/福利本", typicalExperience: "福利服务" },

  // ════════════════════════════════════════════
  // Hospitality 酒店旅游
  // ════════════════════════════════════════════
  { code: "141111", nameEn: "Cafe or Restaurant Manager", nameZh: "餐厅经理", domain: "Hospitality", assessmentBody: "VETASSESS", typicalEducation: "酒店管理大专+", typicalExperience: "餐厅运营" },
  { code: "141311", nameEn: "Hotel or Motel Manager", nameZh: "酒店经理", domain: "Hospitality", assessmentBody: "VETASSESS", typicalEducation: "酒店管理本科", typicalExperience: "酒店管理" },
  { code: "142111", nameEn: "Retail Manager (General)", nameZh: "零售经理", domain: "Hospitality", assessmentBody: "VETASSESS", typicalEducation: "商科/管理", typicalExperience: "零售管理" },

  // ════════════════════════════════════════════
  // Agriculture 农业
  // ════════════════════════════════════════════
  { code: "121111", nameEn: "Aquaculture Farmer", nameZh: "水产养殖业主", domain: "Agriculture", assessmentBody: "VETASSESS", typicalEducation: "水产/农业", typicalExperience: "水产养殖" },
  { code: "121211", nameEn: "Apiarist", nameZh: "养蜂人", domain: "Agriculture", assessmentBody: "VETASSESS", typicalEducation: "农业相关", typicalExperience: "养蜂" },
  { code: "121311", nameEn: "Beef Cattle Farmer", nameZh: "肉牛养殖", domain: "Agriculture", assessmentBody: "VETASSESS", typicalEducation: "农业", typicalExperience: "畜牧" },
];

// ════════════════════════════════════════════
// 工具函数
// ════════════════════════════════════════════

/** 按领域分组 */
export function groupByDomain(): Record<Domain, AnzscoEntry[]> {
  const groups: any = {};
  for (const entry of ANZSCO_CATALOGUE) {
    if (!groups[entry.domain]) groups[entry.domain] = [];
    groups[entry.domain].push(entry);
  }
  return groups;
}

/** 按代码查询 */
export function findByCode(code: string): AnzscoEntry | undefined {
  return ANZSCO_CATALOGUE.find((e) => e.code === code);
}

/** 领域中文标签 */
export const DOMAIN_LABELS: Record<Domain, string> = {
  ICT: "信息技术",
  Engineering: "工程技术",
  Health: "医疗护理",
  Science: "科学研究",
  Education: "教育教学",
  Accounting: "会计金融",
  Business: "商业管理",
  Trades: "技工建筑",
  Creative: "创意设计",
  Social: "社会服务",
  Hospitality: "酒店旅游",
  Agriculture: "农业养殖",
};
