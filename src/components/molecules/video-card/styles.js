import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
   flex:1,
   backgroundColor: colors.white,
  //  marginVertical:mvs(5),
   height: mvs(250) 

  },
  thumbnail:{
    width:'100%',
    height:'100%',
    justifyContent:'center',
    // borderWidth:mvs(1),
    borderRadius:mvs(15),
  },
  play:{
    width:mvs(60),
    height:mvs(60),
    alignSelf:'center',
    position:'absolute',
    top:mvs(67),
  },
  btn:{   // flexGrow: 1,
            width: '100%',
            height: mvs(190),
            borderRadius: mvs(15),
            backgroundColor: colors.red,
  },
  name:{
    marginLeft:mvs(5),
  }
});
export default styles;
