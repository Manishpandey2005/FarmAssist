import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    diseaseDetection: 'Disease Detection',
    fertilizerGuide: 'Fertilizer Guide',
    pestAlerts: 'Pest Alerts',
    pricePrediction: 'Price Prediction',
    cropSuggestion: 'Crop Suggestion',
    govSchemes: 'Gov Schemes',
    farmNews: 'Farm News',
    
    // Common
    loading: 'Loading...',
    submit: 'Submit',
    cancel: 'Cancel',
    close: 'Close',
    
    // Dashboard
    weather: 'Weather',
    marketPrices: 'Market Prices',
    uploadLeafImages: 'Upload leaf images for analysis',
    getPersonalizedRecommendations: 'Get personalized recommendations',
    communityPestWarnings: 'Community pest warnings',
    forecastCropPrices: 'Forecast crop prices',
    getCropRecommendations: 'Get crop recommendations',
    policiesSubsidies: 'Policies & subsidies',
    latestAgricultureUpdates: 'Latest agriculture updates',
    humidity: 'Humidity',
    wind: 'Wind',
    weatherDataUnavailable: 'Weather data unavailable',
    marketDataUnavailable: 'Market data unavailable',
    pricesPerQuintal: 'Prices per quintal',
    
    // Disease Detection
    uploadLeafImage: 'Upload Leaf Image',
    clickToUpload: 'Click to upload leaf image',
    pngJpgUpTo10MB: 'PNG, JPG up to 10MB',
    analyzeDisease: 'Analyze Disease',
    analyzing: 'Analyzing...',
    analysisResults: 'Analysis Results',
    uploadImageToSeeResults: 'Upload an image to see analysis results',
    diseaseDetected: 'Disease Detected:',
    confidence: 'Confidence:',
    treatmentRecommendation: 'Treatment Recommendation:',
    tipsForBetterResults: 'Tips for Better Results',
    
    // Fertilizer
    soilCropParameters: 'Soil & Crop Parameters',
    cropType: 'Crop Type',
    selectCrop: 'Select Crop',
    growthStage: 'Growth Stage',
    selectStage: 'Select Stage',
    temperature: 'Temperature (°C)',
    soilParametersOptional: 'Soil Parameters (Optional - defaults provided)',
    getRecommendation: 'Get Recommendation',
    gettingRecommendation: 'Getting Recommendation...',
    recommendation: 'Recommendation',
    fillParametersForRecommendation: 'Fill in the parameters to get fertilizer recommendation',
    recommendedFertilizer: 'Recommended Fertilizer:',
    dosage: 'Dosage:',
    applicationMethod: 'Application Method:',
    
    // Crop Suggestion
    farmDetails: 'Farm Details',
    landArea: 'Land Area (acres)',
    soilType: 'Soil Type',
    waterAvailability: 'Water Availability',
    climate: 'Climate',
    getCropSuggestions: 'Get Crop Suggestions',
    recommendedCrops: 'Recommended Crops',
    clickForDetails: 'Click for details →',
    fillFarmDetailsForSuggestions: 'Fill in your farm details to get crop suggestions',
    suitable: 'suitable'
  },
  
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    diseaseDetection: 'रोग पहचान',
    fertilizerGuide: 'उर्वरक गाइड',
    pestAlerts: 'कीट चेतावनी',
    pricePrediction: 'मूल्य पूर्वानुमान',
    cropSuggestion: 'फसल सुझाव',
    govSchemes: 'सरकारी योजनाएं',
    farmNews: 'कृषि समाचार',
    
    // Common
    loading: 'लोड हो रहा है...',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    close: 'बंद करें',
    
    // Dashboard
    weather: 'मौसम',
    marketPrices: 'बाजार भाव',
    uploadLeafImages: 'विश्लेषण के लिए पत्ती की तस्वीरें अपलोड करें',
    getPersonalizedRecommendations: 'व्यक्तिगत सिफारिशें प्राप्त करें',
    communityPestWarnings: 'सामुदायिक कीट चेतावनी',
    forecastCropPrices: 'फसल की कीमतों का पूर्वानुमान',
    getCropRecommendations: 'फसल की सिफारिशें प्राप्त करें',
    policiesSubsidies: 'नीतियां और सब्सिडी',
    latestAgricultureUpdates: 'नवीनतम कृषि अपडेट',
    humidity: 'आर्द्रता',
    wind: 'हवा',
    weatherDataUnavailable: 'मौसम डेटा उपलब्ध नहीं',
    marketDataUnavailable: 'बाजार डेटा उपलब्ध नहीं',
    pricesPerQuintal: 'प्रति क्विंटल कीमतें',
    
    // Disease Detection
    uploadLeafImage: 'पत्ती की तस्वीर अपलोड करें',
    clickToUpload: 'पत्ती की तस्वीर अपलोड करने के लिए क्लिक करें',
    pngJpgUpTo10MB: 'PNG, JPG 10MB तक',
    analyzeDisease: 'रोग का विश्लेषण करें',
    analyzing: 'विश्लेषण हो रहा है...',
    analysisResults: 'विश्लेषण परिणाम',
    uploadImageToSeeResults: 'परिणाम देखने के लिए एक तस्वीर अपलोड करें',
    diseaseDetected: 'रोग का पता चला:',
    confidence: 'विश्वास:',
    treatmentRecommendation: 'उपचार की सिफारिश:',
    tipsForBetterResults: 'बेहतर परिणामों के लिए सुझाव',
    
    // Fertilizer
    soilCropParameters: 'मिट्टी और फसल के पैरामीटर',
    cropType: 'फसल का प्रकार',
    selectCrop: 'फसल चुनें',
    growthStage: 'विकास चरण',
    selectStage: 'चरण चुनें',
    temperature: 'तापमान (°C)',
    soilParametersOptional: 'मिट्टी के पैरामीटर (वैकल्पिक - डिफ़ॉल्ट प्रदान किए गए)',
    getRecommendation: 'सिफारिश प्राप्त करें',
    gettingRecommendation: 'सिफारिश मिल रही है...',
    recommendation: 'सिफारिश',
    fillParametersForRecommendation: 'उर्वरक की सिफारिश पाने के लिए पैरामीटर भरें',
    recommendedFertilizer: 'अनुशंसित उर्वरक:',
    dosage: 'खुराक:',
    applicationMethod: 'आवेदन विधि:',
    
    // Crop Suggestion
    farmDetails: 'खेत की जानकारी',
    landArea: 'भूमि क्षेत्र (एकड़)',
    soilType: 'मिट्टी का प्रकार',
    waterAvailability: 'पानी की उपलब्धता',
    climate: 'जलवायु',
    getCropSuggestions: 'फसल सुझाव पाएं',
    recommendedCrops: 'सुझाई गई फसलें',
    clickForDetails: 'विवरण के लिए क्लिक करें →',
    fillFarmDetailsForSuggestions: 'फसल सुझाव पाने के लिए अपने खेत की जानकारी भरें',
    suitable: 'उपयुक्त'
  },
  
  te: {
    // Navigation
    dashboard: 'డాష్‌బోర్డ్',
    diseaseDetection: 'వ్యాధి గుర్తింపు',
    fertilizerGuide: 'ఎరువుల గైడ్',
    pestAlerts: 'కీటకాల హెచ్చరికలు',
    pricePrediction: 'ధర అంచనా',
    cropSuggestion: 'పంట సూచనలు',
    govSchemes: 'ప్రభుత్వ పథకాలు',
    farmNews: 'వ్యవసాయ వార్తలు',
    
    // Common
    loading: 'లోడ్ అవుతోంది...',
    submit: 'సమర్పించు',
    cancel: 'రద్దు చేయి',
    close: 'మూసివేయి',
    
    // Dashboard
    weather: 'వాతావరణం',
    marketPrices: 'మార్కెట్ ధరలు',
    
    // Crop Suggestion
    farmDetails: 'వ్యవసాయ వివరాలు',
    landArea: 'భూమి వైశాల్యం (ఎకరాలు)',
    soilType: 'మట్టి రకం',
    waterAvailability: 'నీటి లభ్యత',
    climate: 'వాతావరణం',
    getCropSuggestions: 'పంట సూచనలు పొందండి',
    recommendedCrops: 'సిఫార్సు చేసిన పంటలు',
    clickForDetails: 'వివరాలకు క్లిక్ చేయండి →'
  },
  
  ta: {
    // Navigation
    dashboard: 'டாஷ்போர்டு',
    diseaseDetection: 'நோய் கண்டறிதல்',
    fertilizerGuide: 'உர வழிகாட்டி',
    pestAlerts: 'பூச்சி எச்சரிக்கைகள்',
    pricePrediction: 'விலை முன்னறிவிப்பு',
    cropSuggestion: 'பயிர் பரிந்துரை',
    govSchemes: 'அரசு திட்டங்கள்',
    farmNews: 'விவசாய செய்திகள்',
    
    // Common
    loading: 'ஏற்றுகிறது...',
    submit: 'சமர்ப்பிக்கவும்',
    cancel: 'ரத்து செய்',
    close: 'மூடு',
    
    // Dashboard
    weather: 'வானிலை',
    marketPrices: 'சந்தை விலைகள்',
    
    // Crop Suggestion
    farmDetails: 'பண்ணை விவரங்கள்',
    landArea: 'நில பரப்பளவு (ஏக்கர்)',
    soilType: 'மண் வகை',
    waterAvailability: 'நீர் கிடைக்கும் தன்மை',
    climate: 'காலநிலை',
    getCropSuggestions: 'பயிர் பரிந்துரைகளைப் பெறுங்கள்',
    recommendedCrops: 'பரிந்துரைக்கப்பட்ட பயிர்கள்',
    clickForDetails: 'விவரங்களுக்கு கிளிக் செய்யவும் →'
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const t = (key) => {
    return translations[currentLanguage][key] || key;
  };

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};