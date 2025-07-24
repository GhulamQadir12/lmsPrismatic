import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.red,
  },

  backgroundimg: {
    width: '100%',
    height: mvs(250),
  },
  infoContainer: {
    width: '100%',
    padding: mvs(20),
    backgroundColor: colors.yellow,

    borderRadius: mvs(10),
  },
  timeContainer: {
    justifyContent: 'flex-start',
    gap: mvs(15),
    marginTop: mvs(10),
    alignItems: 'center',
  },
  checkBtn: {
    width: '45%',
  },

  type: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: mvs(10),
  },
  slide: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#fff',
    padding: 20,
    
  },
  title: {
    fontSize: mvs(14),
    color: '#666',
  },
  description: {
    fontSize: mvs(12),
    color: '#999',
  },
  helpStyle:{
    borderWidth:1,
    borderTopRightRadius:mvs(10),
    borderBottomRightRadius:mvs(10),
    borderTopLeftRadius:mvs(10),
    borderBottomLeftRadius:mvs(10),
    borderColor:colors.primary,
    width:'100%',
    marginBottom:mvs(0),
    marginTop:mvs(15),
  }
});
export default styles;
