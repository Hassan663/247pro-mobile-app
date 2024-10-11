import { StyleSheet } from "react-native";
import Colors from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#F5F5F5', 
    padding: 16, 
    borderRadius: 8,
    marginBottom: 24, 
  },

//   noDataText: {
//     // fontSize: 14,
//     color: 'gray',
// },
  
  timesheetCard: {
    marginBottom: 16,
  },

  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
},
  timesheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 27,
  },
  dateText: {
    fontSize: 20,
    fontWeight: '400',
    color: Colors.gray,
  },
  
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start', 
    // marginBottom: 19, // Added space between each transaction
  },
  verticalLineContainer: {
    alignItems: 'center',
    width: 20,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },
  verticalLine: {
    width: 2,
    flex: 1, // Ensures the line takes up available height between circles without gaps
    backgroundColor: '#DCDBDB',
  },
  transactionDetails: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 16,
   
  },
  transactionDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Title and time in a single row
  },
  actionText: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.black,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'right',
    color: Colors.black,
  },
  addressText: {
    fontSize: 16,
    color: Colors.gray,
    marginTop: 8,
    fontWeight:'400'
  },
  greyContainer: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 100,
    marginRight: 12,
    color: '#F5F5F5',
  },
  userName: {
    fontSize: 16, 
    fontWeight: '400', 
    color: Colors.black,
  },
  totalHoursTextHardCoded: {
    fontSize: 16,
    color: Colors.gray,
    paddingBottom: 16,
  },
  rowContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  totalHoursText: {
    fontSize: 32, 
    fontWeight: '400', 
    color: Colors.black,
  },
  dateRange: {
    fontSize: 14, 
    color: '#666', 
  },
  divider: {
    height: 1,
    backgroundColor: '#DCDBDB', 
    marginVertical: 16, 
  },
});