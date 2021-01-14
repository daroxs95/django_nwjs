# -*- mode: python ; coding: utf-8 -*-

block_cipher = None


a = Analysis(['django_app/manage.py'],
             pathex=['/media/sunshine/SunShiNe/coding/Projects/electron/turquino'],
             binaries=[],
             datas=[
                 ('django_app/main/templatetags', 'main/templatetags'),
                 ('django_app/main/TEMPLATES', 'main/TEMPLATES'),
                 ('django_app/main/static', 'main/static'),
             ],
             hiddenimports=[
                 'main.apps',
                 'main.urls',
                 'main.context_processors',
             ],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,
          [],
          name='server',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=False,
          upx_exclude=[],
          runtime_tmpdir=None,
          console=True )
