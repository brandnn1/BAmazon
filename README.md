# BAmazon

## Overview
BAmazon, like like Amazon is a digital storefront. BAmazon offers different capabilities to different user levels: Customers, Managers and Supervisors. 

Below are examples of how you would interact with this application. Note: This application requires both mysql and inquirer npm bits to be installed



#### -Customer View-

node bamazonCustomer.js

This Customer view is very simplistic. It allows a user to select a product available to them 
![Customer Select Capture](/Images/CustomerSelect.PNG)

then select how many of those units they would like to purchase. 
![Customer Define Units Capture](/Images/CustomerUnits.PNG)

A check is done to ensure there is available stock and if there is, it "purchases" the item in the quantity given. 
![Unit Check Success Capture](/Images/CustomerUnitsSuccess.PNG)

Otherwise it provides a message that there is insufficient stock

![Unit Check Failure Capture](/Images/CustomerUnitsFail.PNG)

After purchase is complete, the inventory is modified to accurately reflect the remaining stock available, and a column is updated which tallies how many units have been sold. 


#### -Manager View-

node bamazonManager.js

The Manager View gets a bit more complex. This view has the ability to do the following:
 View overall products for sale

![Manager View Capture](/Images/ManagerViewProducts.PNG)
 
 Viewing only items that are low in inventory
 
 ![Manager View Low Inventory Capture](/Images/ManagerViewLowProducts.PNG)
 
 Adding new inventory to existing products
 
 ![Manager Add Inventory Capture](/Images/ManagerAddInventory1.PNG)
 ![Manager Add Inventory Capture](/Images/ManagerAddInventory1.PNG)
 Note:  A message is provided after adding inventory detailing the new stock quantity of the item inventory was added for. 
 
 Adding new products available for sale
 
 ![Manager Add New Product Capture](/Images/ManagerAddProducts1.PNG)
 ![Manager Add New Product Capture](/Images/ManagerAddProducts2.PNG)
 Note - When adding a new product - A Manager will only be able to select a department that exists in the departments table. If the value doesn't exist
 				in the departments table it will not be an option. In these cases, a supervisor would need to go in and add the department.


#### -Supervisor View- 

node bamazonSupervisor.js

Supervisors are allowed to view their overall product sales by Department or they can add a new department.
![Supervisor Select Capture](/Images/SupervisorSelect.PNG)

If they view their overall product sales they will see statistics at the department level. Total profit is a field that is calculated on the fly and looks at the overhead cost vs. the total product sales.
![Supervisor Select Capture](/Images/SupervisorView.PNG)

When they add a new department to the table they indicate the name and how much overhead there is going to be. After that a check is done to determine if the 
department already exists in the table. If it doesn't - it is added. 
![Supervisor Select Capture](/Images/SupervisorDeptCheckSuccess.PNG)
Looking at the overall product sales, you can now see the new department listed. Because there are no products available to customers yet however, there are null columns present. 
![Supervisor Select Capture](/Images/SupervisorDeptCheckSuccess2.PNG)

If the department does exist - the supervisor will receive a message indicating such. 
![Supervisor Select Capture](/Images/SupervisorDeptCheckSuccessFail.PNG)

