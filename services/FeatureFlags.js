class FeatureFlags {
  static isExperimental = process.env.EXPO_PUBLIC_APP_ENV === 'experimental';

  static isFeatureEnabled(featureName) {
    const features = {
      userLogin: this.isExperimental,
      fileUpload: this.isExperimental,
      rewardedAds: this.isExperimental
    };
    return features[featureName] || false;
  }
}

export default FeatureFlags;
