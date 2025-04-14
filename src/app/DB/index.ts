import { config } from '../config';
import { USER_ROLE } from '../module/User/user.constant';
import { User } from '../module/User/user.model';
import { Admin } from '../module/Admin/admin.model';

const superAdminData = {
  name: config.SUPERADMIN.NAME,
  userName: config.SUPERADMIN.USERNAME,
  email: config.SUPERADMIN.EMAIL,
  contact: config.SUPERADMIN.CONTACT,
  password: config.SUPERADMIN.PASSWORD,
  gender: config.SUPERADMIN.GENDER,
  role: config.SUPERADMIN.ROLE,
};

export const seedingSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      role: USER_ROLE.SUPER_ADMIN,
    });

    if (!isSuperAdminExist) {
      const newAdmin = await User.create(superAdminData);

      const adminData = {
        userId: newAdmin._id,
        name: superAdminData.name,
        userName: newAdmin.userName,
        email: newAdmin.email,
        contact: newAdmin.contact,
        gender: superAdminData.gender,
      };

      await Admin.create(adminData);

      console.log('Super admin is seeded into the database successfully.');
    } else {
      console.log('Super admin already exists. Skipping creation.');
    }
  } catch (error) {
    console.error('Error seeding super admin:', error);
  }
};
