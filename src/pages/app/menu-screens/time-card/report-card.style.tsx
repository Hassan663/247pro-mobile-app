import { StyleSheet } from "react-native";
import Colors from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalHoursText: {
    fontSize: 12,
    color: Colors.gray,
  },
  totalHoursCount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateRange: {
    fontSize: 12,
    color: Colors.gray,
  },
  timesheetCard: {
    marginBottom: 16,
  },
  timesheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  hoursText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',  // Ensure the items are aligned center
    marginBottom: 8,
  },
  verticalLineContainer: {
    alignItems: 'center',
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary,
   // marginRight: 10, // Ensure spacing between circle and text
  },
  verticalLine: {
    width: 2,
    height: 24,
    backgroundColor: Colors.gray,
   // marginTop: 2,
  },
  transactionDetails: {
    flex: 1,
    flexDirection: 'column',
   // marginLeft: 12,
    paddingVertical: 1,
  },
  transactionDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    color: Colors.black,
  },
  addressText: {
    fontSize: 12,
    color: Colors.gray,
   // marginTop: 4,
  },
  bottomSheetButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  bottomSheetButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});