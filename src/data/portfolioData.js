export const profile = {
  name: "Piyush Kumar",
  title: "Data Scientist | Python Developer",
  email: "pr14122001@gmail.com",
  phone: "8527891728",
  linkedin: "https://linkedin.com",
  github: "https://github.com",
  bio1: "Data Scientist with hands-on experience building and deploying data-driven solutions across fraud detection, recommendation systems, and sustainability analytics.",
  bio2: "Strong foundation in Python, Machine Learning, and data preprocessing - focused on translating business problems into explainable models and decision-ready insights.",
};

export const experience = [
  {
    role: "Prompt Engineer (Freelance)",
    company: "SOUL AI",
    period: "Sep 2024 - Nov 2024",
    location: "Remote",
    points: [
      "Designed and optimized LLM-based prompts for e-commerce anomaly detection, reducing false positives by 20% and improving overall fraud detection accuracy.",
      "Delivered interpretable outputs to support business decision-making rather than black-box predictions.",
    ],
  },
  {
    role: "Genesis Trainee",
    company: "KPIT Technologies",
    period: "Dec 2023 - Apr 2024",
    location: "Pune, India",
    points: [
      "Contributed to Agile development of production-grade software modules using Modern C++, focusing on maintainability and performance.",
      "Refactored legacy components using OOP principles, reducing code complexity by 15% and improving system efficiency.",
    ],
  },
];

export const projects = [
  {
    id: "01",
    title: "Intelligent Credit Decision Engine",
    type: "Fintech - Machine Learning",
    year: "2026",
    tags: ["Python", "Credit Risk Modeling", "WOE/IV", "Probability of default", "FastAPI", "Streamlit"],
    summary: "Deploys the complete pipeline through FastAPI and Streamlit, exposing REST APIs, interactive dashboards, portfolio monitoring, and data drift detection for real-time risk management.",
    highlights: ["Probability of default + WOE/IV analysis", "FastAPI + Streamlit deployment", "Explainable scoring with threshold optimization"],
    images: [
      {
        url: "/assets/5d8e939a-eb4d-4420-af8a-5b45261fd05b.png",
        alt: "Intelligent credit decision engine",
      },
      {
        url: "  /assets/Screenshot (140).png",
        alt: "BERT semantic similarity pipeline",
      },
    ],
    github: "#",
    demo: "#",
  },
  {
    id: "02",
    title: "ML Interpreter: Codeless Data Analysis",
    type: "EDA - Model Explainability",
    year: "2024",
    tags: ["Python", "Streamlit", "SHAP", "LIME", "Pandas"],
    summary: "Interactive ML interpretability platform that explains predictions of black-box models (Random Forest, XGBoost, LightGBM) through global and local insights — enabling transparent and trustable decision-making.",
    highlights: ["40% reduction in analysis time", "SHAP & LIME explainability", "No-code interface"],
    images: [
      {
        url: "assets/d35773db-2996-4b53-8f91-9bcb6e6ccf2a.png",
        alt: "EDA dashboard interface",
      },
      {
        url: "assets/Screenshot (141).png",
        alt: "SHAP feature importance chart",
      },
    ],
    github: "https://github.com/Piyushkumar14/ML_Interpretor",
    demo: "https://mlinterpretorgit.streamlit.app/  ",
  },
  {
    id: "04",
    title: "Personalized Music Recommendation",
    type: "Recommender System",
    year: "2023",
    tags: ["Python", "Spotify API", "Cosine Similarity", "Pandas"],
    summary: "Personalized music recommendation system using Spotify API that suggests similar tracks based on content features and user preferences — enabling dynamic playlist discovery.",
    highlights: ["35% relevance improvement", "Spotify API integration", "Adapts to evolving preferences"],
    images: [
      {
        url: "assets/69e1a25c-9f9d-47d9-a32d-76ff17d469b9.png",
        alt: "Spotify recommendation system",
      },
      {
        url: "assets/Screenshot (160).png",
        alt: "Content-based filtering architecture",
      },
    ],
    github: "https://github.com/Piyushkumar14/music_recommemdation_system-using-SpotifyAPI",
    demo: "https://recommendmusic.streamlit.app/"
  },
  {
    id: "03",
    title: "Resume Ranking System with AI",
    type: "NLP - Machine Learning",
    year: "2025",
    tags: ["Python", "BERT", "TF-IDF", "NLP", "Flask"],
    summary: "End-to-end resume ranking platform with multi-signal scoring (TF-IDF, BERT, and ML) that automates candidate shortlisting with transparent score breakdowns - enabling faster and more consistent hiring decisions.",
    highlights: ["TF-IDF + BERT semantic ranking", "Configurable weighted scoring", "Fallback & diagnostic endpoints"],
    images: [
      {
        url: "https://raw.githubusercontent.com/Ajaysdhillon/AI-Powered-Resume-Matcher-Intelligent-Job-Fit-Analysis/refs/heads/main/images/app_screenshot.png",
        alt: "Resume ranking system UI",
      },
      {
        url: "https://miro.medium.com/v2/resize:fit:1400/1*H4YwOEfCDSFCHNB-u7OkuA.png",
        alt: "BERT semantic similarity pipeline",
      },
    ],
    github: "#",
    demo: "#",
  },
  
  {
    id: "05",
    title: "Credit Risk Scoring Engine",
    type: "ML - Classification",
    year: "2025",
    tags: ["Python", "LightGBM", "Scikit-learn", "Pandas", "Calibration"],
    summary: "Built a probability-of-default scoring system with calibrated outputs and threshold optimization to align model decisions with business risk bands.",
    highlights: ["AUC 0.91", "Calibrated probability outputs", "Risk-tier threshold strategy"],
    images: [
      {
        url: "https://picsum.photos/seed/credit-risk-1/900/600",
        alt: "Credit risk model dashboard",
      },
      {
        url: "https://picsum.photos/seed/credit-risk-2/900/600",
        alt: "Risk bands and score distribution",
      },
    ],
    github: "#",
    demo: "#",
  },
  {
    id: "06",
    title: "Retail Forecasting Dashboard",
    type: "Time Series - Analytics",
    year: "2025",
    tags: ["Python", "Prophet", "ARIMA", "Plotly", "Streamlit"],
    summary: "Developed a forecasting dashboard combining statistical and ML time-series models, helping teams compare scenarios and reduce stock-out risk.",
    highlights: ["7.8% MAPE on validation", "Scenario-based planning", "Interactive drilldown views"],
    images: [
      {
        url: "https://picsum.photos/seed/retail-forecast-1/900/600",
        alt: "Retail sales forecasting dashboard",
      },
      {
        url: "https://picsum.photos/seed/retail-forecast-2/900/600",
        alt: "Seasonality and trend decomposition",
      },
    ],
    github: "#",
    demo: "#",
  },
  {
    id: "07",
    title: "Customer Segmentation Studio",
    type: "Unsupervised Learning",
    year: "2024",
    tags: ["Python", "KMeans", "PCA", "Seaborn", "Flask"],
    summary: "Created a segmentation workflow to cluster users by behavioral patterns and generate actionable personas for marketing experiments.",
    highlights: ["4 high-value customer clusters", "PCA-based visual interpretation", "Campaign-ready persona export"],
    images: [
      {
        url: "https://picsum.photos/seed/segment-1/900/600",
        alt: "Customer segmentation scatter plot",
      },
      {
        url: "https://picsum.photos/seed/segment-2/900/600",
        alt: "Persona summary cards",
      },
    ],
    github: "#",
  },
];

export const featuredProjects = projects.slice(0, 3);

export const skillGroups = [
  {
    category: "Programming & Tools",
    icon: "⌨",
    skills: [
      { name: "Python (Pandas, NumPy, Scikit-learn)", pct: 92, note: "Core language" },
      { name: "SQL", pct: 80, note: "PostgreSQL - MySQL" },
      { name: "Flask & Streamlit", pct: 75, note: "Model serving & apps" },
      { name: "Git & REST APIs", pct: 78, note: "Version control & integration" },
      { name: "Java / C++ (17, 20)", pct: 65, note: "Production software" },
    ],
  },
  {
    category: "Machine Learning",
    icon: "⚙",
    skills: [
      { name: "Regression & Classification", pct: 88, note: "Scikit-learn - XGBoost" },
      { name: "NLP (TF-IDF, BERT)", pct: 82, note: "Text pipelines" },
      { name: "Time Series (ARIMA)", pct: 72, note: "Forecasting" },
      { name: "Model Explainability (SHAP, LIME)", pct: 80, note: "Interpretable ML" },
    ],
  },
  {
    category: "Deep Learning & AI",
    icon: "◫",
    skills: [
      { name: "Neural Networks", pct: 68, note: "Keras - TensorFlow" },
      { name: "LLM Prompt Engineering", pct: 78, note: "Generative AI - SOUL AI" },
      { name: "Generative AI", pct: 65, note: "Applied LLMs" },
    ],
  },
  {
    category: "Data Visualisation",
    icon: "□",
    skills: [
      { name: "Matplotlib & Seaborn", pct: 85, note: "Statistical charts" },
      { name: "Tableau & Power BI", pct: 72, note: "BI dashboards" },
      { name: "EDA & Feature Engineering", pct: 88, note: "Analytical reporting" },
    ],
  },
];

export const projectDeepDive = {
  "01": {
    challenge: "Traditional credit approval processes often rely on rigid rule-based systems or opaque predictive models, making lending decisions inconsistent, difficult to explain, and challenging to monitor for changing portfolio risk. Financial institutions require accurate, transparent, and scalable credit risk assessment to improve lending decisions while minimizing default risk.",
    approach: "Developed a production-style credit risk pipeline combining feature engineering, XGBoost-based Probability of Default modeling, WOE/IV scorecard analysis, SHAP explainability, and policy-driven lending decisions through FastAPI and Streamlit interfaces.",
    workflow: [
      "Ingests and preprocesses Lending Club loan data by cleaning financial attributes, engineering features, creating default labels, and performing temporal train-test splits for realistic model evaluation.",
      "Trains an XGBoost Probability of Default (PD) model with probability calibration and evaluates performance using industry-standard risk metrics such as ROC-AUC and Brier Score.",
      "Generates Weight of Evidence (WOE) and Information Value (IV) reports to evaluate predictive strength and improve feature selection for credit scoring.",
      "Applies configurable lending policies to classify applications as Approve, Manual Review, or Decline, while dynamically recommending an appropriate credit limit based on predicted risk.",
      "Produces SHAP-based explainability to identify the key factors influencing each lending decision, improving transparency and regulatory interpretability.",
      "Deploys the complete pipeline through FastAPI and Streamlit, exposing REST APIs, interactive dashboards, portfolio monitoring, and data drift detection for real-time risk management.",
    ],
    outcome: "Automated credit risk assessment with explainable lending decisions, dynamic credit limit recommendations, and portfolio-level monitoring for scalable and transparent loan evaluation.",
  },
  "03": {
    challenge: "Recruiters face difficulty in screening large volumes of resumes efficiently, often relying on basic keyword filters that ignore context and fail to capture true candidate relevance. This results in inconsistent shortlisting, missed high-quality candidates, and increased manual effort.",
    approach: "Designed a multi-signal ranking system leveraging lexical (TF-IDF), semantic (BERT), and learned (ML) signals, fused via weighted scoring and deployed as a scalable, explainable Flask-based service.",
    workflow: [
      "Accepts job descriptions and resume uploads through a Flask-based web interface, storing all data in a structured SQLite database for persistent tracking.",
      "Parses resumes to extract structured information such as skills, experience, and education using NLP-based processing pipelines.",
      "Computes multi-dimensional relevance scores (TF-IDF for keyword-level matching, BERT embeddings for semantic similarity, and an ML-based ranking model for learned scoring patterns).",
      "Combines all signals using a configurable weighted scoring system (TF-IDF, BERT, ML) to generate a final ranking score for each candidate.",
      "Provides score transparency and diagnostics, allowing recruiters to understand why a candidate is ranked higher through detailed score breakdowns and system endpoints.",
      "Deploys via Flask APIs with both UI and JSON endpoints, enabling integration with external recruiter tools and scalable usage across hiring workflows.",
    ],
    outcome: "Automated and standardized resume shortlisting using multi-signal ranking, improving relevance and reducing manual screening effort.",
  },
  "02": {
    challenge: "Machine learning models, especially ensemble methods, often act as black boxes, making it difficult to understand how predictions are generated. This lack of transparency reduces trust, limits debugging capability, and makes models harder to deploy in real-world decision systems.",
    approach: "Developed an interpretable ML pipeline combining tree-based ensemble models with global and local explanation techniques, delivered through an interactive Streamlit interface.",
    workflow: [
      "User uploads CSV and selects target variable and problem type (classification/regression).",
      "Pipeline auto-runs data quality checks: missing values, cardinality checks, outlier flags, and datatype validation.",
      "Generates visual EDA dashboards (distribution, correlation, category impact, and target drift views).",
      "Trains baseline and optimized models with cross-validation, then computes SHAP global importance and LIME local explanations.",
      "Exports a concise report with model metrics, explanation charts, and actionable recommendations.",
    ],
    outcome: "Enabled transparent and interpretable ML predictions, improving model trust, debugging capability, and usability for decision-making.",
  },
  "04": {
    challenge: "Users often struggle to discover new music aligned with their taste, as traditional browsing or static playlists fail to capture nuanced preferences like audio features, genres, and listening patterns.",
    approach: "Built a content-based recommendation engine leveraging Spotify audio features and similarity metrics to generate personalized music suggestions via API integration.",
    workflow: [
      "Integrates with the Spotify API to fetch song metadata, audio features, and artist information dynamically.",
      "Processes track-level features such as tempo, energy, danceability, and genre to represent songs numerically.",
      "Applies content-based filtering to compute similarity between tracks using feature vectors and distance metrics.",
      "Generates recommendations by identifying songs with the highest similarity to user-selected tracks.",
      "Provides an interactive interface (Streamlit-based) to search songs and visualize recommended tracks in real time.",
    ],
    outcome: "Enabled personalized music discovery by generating relevant track recommendations based on user preferences and song-level feature similarity.",
  },
  "05": {
    challenge: "Credit decisions needed a risk score that is both accurate and interpretable, with thresholding aligned to business loss tolerance.",
    approach: "Built a calibrated probability-of-default model with LightGBM and post-model threshold optimization for risk tiers.",
    workflow: [
      "Prepared borrower-level features from application and repayment history, including delinquency and utilization patterns.",
      "Trained LightGBM with stratified CV and class imbalance handling.",
      "Calibrated output probabilities (isotonic/platt options) to produce realistic risk estimates.",
      "Derived business thresholds for low/medium/high risk using expected-loss tradeoff analysis.",
      "Published scorecards and monitoring charts for drift and threshold stability.",
    ],
    outcome: "Delivered a stable and decision-ready risk scoring pipeline with strong AUC and operationally meaningful risk segments.",
  },
  "06": {
    challenge: "Planning teams needed reliable demand forecasts and scenario testing to reduce stock-outs and overstock events.",
    approach: "Created an ensemble forecasting workflow (Prophet + ARIMA) with a dashboard for scenario comparison across categories.",
    workflow: [
      "Ingested historical sales, promotions, holiday calendars, and external seasonality indicators.",
      "Trained per-category models and an ensemble combiner based on validation error behavior.",
      "Evaluated with rolling-origin backtesting and tracked MAPE/MAE by category.",
      "Implemented scenario controls (promotion uplift, discount level, and campaign windows).",
      "Displayed forecasts, confidence intervals, and exception alerts in an interactive dashboard.",
    ],
    outcome: "Enabled faster planning decisions with measurable forecast quality gains and clear visibility into seasonal risk.",
  },
  "07": {
    challenge: "Marketing campaigns were broad and inefficient because customer groups were not behaviorally segmented.",
    approach: "Built a segmentation studio using KMeans + PCA visual diagnostics to produce interpretable personas for campaign targeting.",
    workflow: [
      "Engineered features from recency, frequency, monetary, and channel interaction data.",
      "Scaled and transformed variables, then selected cluster count using silhouette and elbow analysis.",
      "Trained clustering model and projected clusters into PCA space for stakeholder-friendly visualization.",
      "Generated persona summaries with key traits, expected value, and preferred channels.",
      "Exported segment-ready lists and campaign recommendations for activation.",
    ],
    outcome: "Created actionable customer personas and improved campaign targeting precision with data-backed segment strategy.",
  },
};
