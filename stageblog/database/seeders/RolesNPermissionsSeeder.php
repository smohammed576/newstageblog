<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesNPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Permission::create(['name' => 'view_posts']);
        // Permission::create(['name' => 'create_posts']);
        // Permission::create(['name' => 'edit_posts']);
        // Permission::create(['name' => 'delete_posts']);

        // Permission::create(['name' => 'create_comments']);
        // Permission::create(['name' => 'create_actions']);
        // Permission::create(['name' => 'edit_actions']);

        // Permission::create(['name' => 'create_movies']);
        // Permission::create(['name' => 'create_shows']);

        // Permission::create(['name' => 'view_images']);
        // Permission::create(['name' => 'create_images']);

        // Permission::create(['name' => 'create_hours']);

        // Permission::create(['name' => 'create_users']);

        // $admin = Role::create(['name' => 'admin']);
        // $user = Role::create(['name' => 'user']);
        // $public = Role::create(['name' => 'public']);

        // $admin->givePermissionTo(['view_posts', 'create_posts', 'edit_posts', 'delete_posts', 'create_comments', 'create_actions', 'edit_actions', 'create_movies', 'create_shows', 'view_images', 'create_images', 'create_hours', 'create_users']);
        // $user->givePermissionTo(['view_posts', 'create_comments', 'create_actions', 'edit_actions']);
        // $public->givePermissionTo(['view_posts', 'create_actions', 'edit_actions']);

        $user = User::find(3);
        $user->assignRole('user');
    }
}
