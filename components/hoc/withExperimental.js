import FeatureFlags from '@/services/FeatureFlags';

const withExperimental = (featureName, WrappedComponent) => {
  return (props) => {
    if (!FeatureFlags.isFeatureEnabled(featureName)) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withExperimental;
