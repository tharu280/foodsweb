'use client'

import { useState } from 'react'
import { FoodItem } from '@prisma/client'
import { addFood, updateFood, deleteFood, toggleAvailability, logout } from '@/app/actions'
import { Trash2, Edit, Plus, LogOut } from 'lucide-react'

export function AdminDashboard({ foods }: { foods: FoodItem[] }) {
    const [editingId, setEditingId] = useState<number | null>(null)

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <form action={logout}>
                        <button className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold">
                            <LogOut size={20} />
                            Logout
                        </button>
                    </form>
                </div>

                {/* Add New Item Form */}
                <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Item</h2>
                    <form action={async (formData) => {
                        await addFood(formData)
                        // Ideally clear form here
                        const form = document.getElementById('add-form') as HTMLFormElement
                        form?.reset()
                    }} id="add-form" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="name" placeholder="Name" required className="border p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none" />
                        <input name="price" type="number" step="0.01" placeholder="Price (LKR)" required className="border p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none" />
                        <input name="imageUrl" placeholder="Image URL" required className="border p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none" />
                        <input name="description" placeholder="Description" required className="border p-2 rounded md:col-span-2 focus:ring-2 focus:ring-orange-500 outline-none" />
                        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 md:col-span-2 flex items-center justify-center gap-2 font-bold transition-colors">
                            <Plus size={20} /> Add Item
                        </button>
                    </form>
                </div>

                {/* Food List */}
                <div className="space-y-6">
                    {/* Desktop Table View */}
                    <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="p-4 font-semibold text-gray-600">Image</th>
                                    <th className="p-4 font-semibold text-gray-600">Name</th>
                                    <th className="p-4 font-semibold text-gray-600">Price</th>
                                    <th className="p-4 font-semibold text-gray-600">Status</th>
                                    <th className="p-4 font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foods.map(food => (
                                    <tr key={food.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <img src={food.imageUrl} alt={food.name} className="w-16 h-16 object-cover rounded-lg" />
                                        </td>
                                        <td className="p-4">
                                            {editingId === food.id ? (
                                                <form action={async (formData) => {
                                                    await updateFood(food.id, formData)
                                                    setEditingId(null)
                                                }} className="flex flex-col gap-2">
                                                    <input name="name" defaultValue={food.name} className="border p-1 rounded text-gray-900" />
                                                    <input name="description" defaultValue={food.description} className="border p-1 rounded text-gray-900" />
                                                    <input name="imageUrl" defaultValue={food.imageUrl} className="border p-1 rounded text-gray-900" />
                                                    <input name="price" type="number" defaultValue={food.price} className="border p-1 rounded text-gray-900" />
                                                    <div className="flex gap-2">
                                                        <button type="submit" className="bg-blue-600 text-white px-2 py-1 rounded text-sm">Save</button>
                                                        <button type="button" onClick={() => setEditingId(null)} className="text-gray-500 text-sm">Cancel</button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <div>
                                                    <div className="font-bold text-gray-800">{food.name}</div>
                                                    <div className="text-sm text-gray-500 truncate max-w-xs">{food.description}</div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 font-medium">LKR {food.price}</td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => toggleAvailability(food.id, !food.isAvailable)}
                                                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${food.isAvailable ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
                                            >
                                                {food.isAvailable ? 'In Stock' : 'Out of Stock'}
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <button onClick={() => setEditingId(food.id)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                                                    <Edit size={18} />
                                                </button>
                                                <button onClick={() => deleteFood(food.id)} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                        {foods.map(food => (
                            <div key={food.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                {editingId === food.id ? (
                                    <div className="p-4">
                                        <form action={async (formData) => {
                                            await updateFood(food.id, formData)
                                            setEditingId(null)
                                        }} className="flex flex-col gap-3">
                                            <input name="name" defaultValue={food.name} placeholder="Name" className="border p-2 rounded text-gray-900" />
                                            <input name="price" type="number" defaultValue={food.price} placeholder="Price" className="border p-2 rounded text-gray-900" />
                                            <input name="imageUrl" defaultValue={food.imageUrl} placeholder="Image URL" className="border p-2 rounded text-gray-900" />
                                            <textarea name="description" defaultValue={food.description} placeholder="Description" className="border p-2 rounded text-gray-900" rows={3} />
                                            <div className="flex gap-2 pt-2">
                                                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded font-medium">Save Changes</button>
                                                <button type="button" onClick={() => setEditingId(null)} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded font-medium">Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="relative h-48 w-full">
                                            <img src={food.imageUrl} alt={food.name} className="w-full h-full object-cover" />
                                            <div className="absolute top-2 right-2">
                                                <button
                                                    onClick={() => toggleAvailability(food.id, !food.isAvailable)}
                                                    className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${food.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                                >
                                                    {food.isAvailable ? 'In Stock' : 'Out of Stock'}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-lg text-gray-900">{food.name}</h3>
                                                <span className="font-serif font-bold text-orange-600">LKR {food.price}</span>
                                            </div>
                                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{food.description}</p>

                                            <div className="flex gap-2 border-t pt-4">
                                                <button
                                                    onClick={() => setEditingId(food.id)}
                                                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                                                >
                                                    <Edit size={16} /> Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteFood(food.id)}
                                                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium"
                                                >
                                                    <Trash2 size={16} /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
