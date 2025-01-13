class FeatureFlags {
  static isExperimental = process.env.EXPO_PUBLIC_APP_ENV === 'development';

  static isFeatureEnabled(featureName) {
    const features = {
      userLogin: this.isExperimental
    };
    return features[featureName] || false;
  }
}

export default FeatureFlags;
