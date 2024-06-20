import { View } from "react-native"
import { FeelingIcon_32 } from "../../../../../../components/Icons/feeling-icon-32"
import { Text } from '../../../../../../components/text';
import { useAppTheme } from "../../../../../../hooks/useAppTheme";

export const FeelingDot = () => {
  const theme = useAppTheme();

  return (
    <View style={{
      gap: 6,
      alignItems: 'center'
    }}>
      <FeelingIcon_32 fill='#F55634' />
      <Text style={{
        fontSize: theme.fontStyle.xs[3].size,
        fontWeight: theme.fontStyle.xs[3].weight,
      }}>興奮</Text>
    </View>
  )
}
