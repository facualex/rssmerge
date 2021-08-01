<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request) {
        if (env('ALLOW_REGISTRATION') == false){
            return response([
                'success' => false,
                'message' => 'This action is not allowed',
            ], 403); // 403 = Forbidden
        };

        $fields = $request->validate([
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string'
        ]);

        $user = User::create([
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']) 
        ]);

        $token = $user->createToken($fields['email'])->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token,
        ];

        return response($response, 201);
    }

    public function logout(Request $request) {
        auth()->user()->tokens()->delete();

        return response([
            'success' => true,
            'message' => 'Logged out'
        ], 200);
    }

    public function login(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields["password"], $user->password)) {
            return response([
               'success' => false,
               'message' => 'Invalid credentials',
            ], 400);
        }

        $token = $user->createToken($fields['email'])->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token,
        ];

        return response($response, 201);
    }
}
