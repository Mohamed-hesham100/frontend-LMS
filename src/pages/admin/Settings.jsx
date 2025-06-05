import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const InstructorSettings = () => {
  const [profile, setProfile] = useState({
    name: "Mohamed Hisham",
    email: "instructor@example.com",
    bio: "",
  });

  const [payment, setPayment] = useState({
    paypal: "",
    stripe: "",
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 md:p-10 bg-white dark:bg-gray-900 rounded-xl shadow-md max-w-5xl mx-auto my-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-purple-700 dark:text-purple-400">
        Instructor Settings
      </h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-md flex gap-2 mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          {/* <TabsTrigger value="payment">Payment</TabsTrigger> */}
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <div className="space-y-4">
            <Input
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              placeholder="Your full name"
              className="dark:bg-gray-800 dark:border-gray-700"
            />
            <Input
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              placeholder="example@email.com"
              className="dark:bg-gray-800 dark:border-gray-700"
            />
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleProfileChange}
              placeholder="Short bio..."
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md p-3 text-sm"
              rows={4}
            />
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Save Profile
            </Button>
          </div>
        </TabsContent>

        {/* Payment Settings
        <TabsContent value="payment">
          <div className="space-y-4">
            <Input
              name="paypal"
              value={payment.paypal}
              onChange={handlePaymentChange}
              placeholder="PayPal Email"
              className="dark:bg-gray-800 dark:border-gray-700"
            />
            <Input
              name="stripe"
              value={payment.stripe}
              onChange={handlePaymentChange}
              placeholder="Stripe Account ID"
              className="dark:bg-gray-800 dark:border-gray-700"
            />
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Save Payment Info
            </Button>
          </div>
        </TabsContent> */}

        {/* Security Settings */}
        <TabsContent value="security">
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Current Password"
              className="dark:bg-gray-800 dark:border-gray-700"
            />
            <Input
              type="password"
              placeholder="New Password"
              className="dark:bg-gray-800 dark:border-gray-700"
            />
            <Input
              type="password"
              placeholder="Confirm New Password"
              className="dark:bg-gray-800 dark:border-gray-700"
            />
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Update Password
            </Button>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <div className="space-y-3 text-sm text-gray-800 dark:text-gray-200">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="accent-purple-600" />
              <span>Receive email notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-purple-600" />
              <span>Notify me about course reviews</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-purple-600" />
              <span>Notify me when students enroll</span>
            </label>
            <Button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">
              Save Preferences
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstructorSettings;
