import React, { useState } from 'react';
import { X, Save, ShieldPlus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { createPortal } from 'react-dom';
// import createAdmin from "../services/authApi"
import authApi from "../services/authApi";

export function CreateAdminModal({ isOpen, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isPending, setIsPending] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!formData.name || !formData.email || !formData.mobile || !formData.password) {
            setErrorMessage('Please fill out all fields.');


            return;
        }

        setIsPending(true);
        try {
            const result = await authApi.createAdmin(formData);
            if (onSuccess) onSuccess(`Admin "${result.data.name}" created successfully.`);
            setFormData({ name: '', email: '', mobile: '', password: '' });
            onClose();
        } catch (err) {
            setErrorMessage(err.response?.data?.message || 'Failed to create admin.');
            setFormData({
                name: '',
                email: '',
                mobile: '',
                password: '',
            });
        } finally {
            setIsPending(false);
        }
    };

    // return (
    //     <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
    //         <div className="bg-card rounded-xl border max-w-md w-full flex  max-h-[90vh] overflow-y-auto flex flex-col shadow-xl">
    //             //headers
    //             <div className="flex items-center justify-between p-6 border-b">
    //                 <div>
    //                     <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
    //                         <ShieldPlus className="h-5 w-5 text-sky-600" />
    //                         Create New Admin
    //                     </h2>
    //                     <p className="text-xs text-slate-500 mt-1">
    //                         Grant administrator access to a new account.
    //                     </p>
    //                 </div>
    //                 <button
    //                     onClick={onClose}
    //                     className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white transition-colors cursor-pointer"
    //                 >
    //                     <X className="h-5 w-5" />
    //                 </button>
    //             </div>

    //             <div className="p-6">
    //                 {errorMessage && (
    //                     <div className="p-3 mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
    //                         {errorMessage}
    //                     </div>
    //                 )}

    //                 <form id="createAdminForm" onSubmit={handleSubmit} className="space-y-4">
    //                     <div className="space-y-1.5">
    //                         <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Name *</label>
    //                         <Input name="name" value={formData.name} onChange={handleChange} placeholder="Full name" required />
    //                     </div>
    //                     <div className="space-y-1.5">
    //                         <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email *</label>
    //                         <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="admin@example.com" required />
    //                     </div>
    //                     <div className="space-y-1.5">
    //                         <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Mobile *</label>
    //                         <Input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="9999999999" required />
    //                     </div>
    //                     <div className="space-y-1.5">
    //                         <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password *</label>
    //                         <Input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Minimum 6 characters" minLength={6} required />
    //                     </div>
    //                 </form>
    //             </div>

    //             <div className="p-6 border-t bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3 rounded-b-xl">
    //                 <Button variant="outline" onClick={onClose} disabled={isPending} className="cursor-pointer">
    //                     Cancel
    //                 </Button>
    //                 <Button form="createAdminForm" type="submit" disabled={isPending} className="gap-2 bg-sky-600 hover:bg-sky-700 cursor-pointer">
    //                     <Save className="h-4 w-4" />
    //                     {isPending ? 'Creating...' : 'Create Admin'}
    //                 </Button>
    //             </div>
    //         </div>
    //     </div>
    // );
    return createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">

            <div className="bg-card rounded-xl border max-w-md w-full max-h-[90vh] overflow-y-auto flex flex-col shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <ShieldPlus className="h-5 w-5 text-sky-600" />
                            Create New Admin
                        </h2>

                        <p className="text-xs text-slate-500 mt-1">
                            Grant administrator access to a new account.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white transition-colors cursor-pointer"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Form */}
                <div className="p-6">
                    {errorMessage && (
                        <div className="p-3 mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                            {errorMessage}
                        </div>
                    )}

                    <form
                        id="createAdminForm"
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold">
                                Name *
                            </label>

                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full name"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold">
                                Email *
                            </label>

                            <Input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="admin@example.com"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold">
                                Mobile *
                            </label>

                            <Input
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="9999999999"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold">
                                Password *
                            </label>

                            <Input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Minimum 6 characters"
                                minLength={6}
                                required
                            />
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="p-6 border-t bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3 rounded-b-xl">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>

                    <Button
                        form="createAdminForm"
                        type="submit"
                        disabled={isPending}
                        className="gap-2 bg-sky-600 hover:bg-sky-700"
                    >
                        <Save className="h-4 w-4" />

                        {isPending ? 'Creating...' : 'Create Admin'}
                    </Button>
                </div>

            </div>
        </div>,

        document.body
    );
}

export default CreateAdminModal;